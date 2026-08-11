import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
// import Toast from 'react-native-toast-message';
import { useGetExamTimeQuery, useLazyGetUserExamPaperQuery, useUserExamCheckMutation } from '../redus/api/user.api';
import { useExamNameQuery } from '../redus/api/admin.api';

const Exam = () => {
    const route = useRoute();
    const { examId } = route.params;
    console.log(examId)

    const { navigate } = useNavigation();
    const currentUserId = useSelector(state => state.auth.user.id);
    const [userExamData, { isSuccess, isLoading, isError, error }] = useUserExamCheckMutation();
    const [fetchPaper, { data }] = useLazyGetUserExamPaperQuery();
    const { data: examTime } = useGetExamTimeQuery();
    const { data: examName } = useExamNameQuery();

    console.log(examTime)


    const [paperData, setPaperData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState([]);
    const answerRef = useRef([]);
    const hasSubmittedRef = useRef(false);
    const [timeLeft, setTimeLeft] = useState('');
    const currentQuestion = paperData[currentQuestionIndex];

    useEffect(() => {
        if (examId) {
            fetchPaper(examId);
        }
    }, [examId]);

    // useEffect(() => {
    //     fetchPaper()
    // }, []);

    useEffect(() => {
        if (data && data.result) {
            const processed = data.result.map(item => ({
                ...item,
                options: [item.firstoption, item.secondoption, item.thirdoption, item.fourthoption],
            }))
            setPaperData(processed);
        }
    }, [data]);

    useEffect(() => {
        if (!examTime?.setTime || paperData.length === 0) return;

        const now = new Date().getTime();
        const currentExam = examTime.setTime.find(exam => {
            const start = new Date(exam.startTime).getTime();
            const end = new Date(exam.endTime).getTime();
            return now >= start && now <= end;
        })

        if (!currentExam) {
            Alert.alert("Notice", "Exam has not started or time is over.");
            navigate("Home");
            return;
        }

        const end = new Date(currentExam.endTime).getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();

            if (now > end) {
                if (!hasSubmittedRef.current) {
                    handleSubmit();
                    hasSubmittedRef.current = true;
                }
                clearInterval(interval);
                setTimeLeft('Time is up!');
            } else {
                const diff = end - now;
                const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const m = Math.floor(diff / (1000 * 60)) % 60;
                const s = Math.floor((diff / 1000) % 60);
                setTimeLeft(`${h} hrs ${m} min ${s < 10 ? '0' + s : s} sec`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [examTime, paperData]);

    const handleOptionSelect = (value) => {
        const selected = {
            userId: currentUserId,
            questionId: currentQuestion._id,
            question: currentQuestion.question,
            selectedOption: value
        };

        setAnswer(prev => {
            const updated = prev.filter(a => a.questionId !== currentQuestion._id);
            const final = [...updated, selected];
            answerRef.current = final;
            return final;
        });
    };

    const handleSubmit = async () => {
        if (hasSubmittedRef.current) return;

        const finalAnswers = paperData.map(q => {
            const existing = answerRef.current.find(a => a.questionId === q._id);
            return {
                userId: currentUserId,
                questionId: q._id,
                question: q.question,
                selectedOption: existing?.selectedOption || "Not Attempted"
            };
        });

        const payload = {
            userId: currentUserId,
            answers: finalAnswers,
            exam: examId,
        };

        await userExamData(payload);
        hasSubmittedRef.current = true;
    };

    useEffect(() => {
        if (isSuccess) {
            navigate("success");
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            Toast.show({
                type: 'error',
                text1: error?.data?.message || "Unable to submit exam",
            });
        }
    }, [isError]);

    if (isLoading) return <Text>Loading...</Text>;

    return (
        <View style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            flexDirection: 'row',
        }}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>📄 Exam Paper</Text>
                    <Text style={styles.timer}>⏳ {timeLeft}</Text>
                </View>

                {
                    examName && examName.result.map(item => <View>
                        <Text>{item.exam}</Text>
                    </View>)
                }

                {currentQuestion && (
                    <View style={styles.questionBox}>
                        <Text style={styles.question}>
                            Q{currentQuestionIndex + 1}. {currentQuestion.question}
                        </Text>
                        {currentQuestion.options.map((opt, i) => (
                            <TouchableOpacity
                                key={i}
                                style={[
                                    styles.option,
                                    answer.some(a => a.questionId === currentQuestion._id && a.selectedOption === opt)
                                        ? styles.selectedOption
                                        : null
                                ]}
                                onPress={() => handleOptionSelect(opt)}
                            >
                                <Text>{opt}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                <View style={styles.navButtons}>
                    <Button
                        title="Previous"
                        disabled={currentQuestionIndex === 0}
                        onPress={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                    />
                    <Button
                        title="Next"
                        disabled={currentQuestionIndex === paperData.length - 1}
                        onPress={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                    />
                </View>

                <View style={styles.submitContainer}>
                    <Button title="Submit" disabled={hasSubmittedRef.current} onPress={handleSubmit} />
                </View>

                {/* <Toast /> */}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        flex: 1,
    },
    header: {
        alignItems: 'center',
        marginVertical: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    timer: {
        fontSize: 16,
        color: 'red',
        marginTop: 8,
    },
    questionBox: {
        marginVertical: 20,
    },
    question: {
        fontSize: 18,
        marginBottom: 12,
    },
    option: {
        padding: 12,
        marginVertical: 6,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    selectedOption: {
        backgroundColor: '#add8e6',
    },
    navButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    submitContainer: {
        marginTop: 20,
    },
});

export default Exam;