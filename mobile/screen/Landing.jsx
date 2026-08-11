import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { useGetExamTimeQuery } from '../redus/api/user.api';

const Landing = () => {
    const navigation = useNavigation();
    const { data, isError, isSuccess, error } = useGetExamTimeQuery();
    // console.log(data);

    if (isError) {
        console.log(error)
    }
    if (isSuccess) {
        console.log(data)
    }



    return (
        <View style={{ flex: 1, margin: 10 }}>
            <Text>{process.env.EXPO_PUBLIC_BACKEND_URL}</Text>
            <ScrollView contentContainerStyle={styles.container}>
                {data?.setTime?.map((item, index) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>{item.examName}</Text>
                        </View>
                        <View style={styles.body}>
                            <Text style={styles.bodyText}>
                                Start Time: {format(new Date(item.startTime), 'hh:mm a')}
                            </Text>
                            <Text style={styles.bodyText}>
                                End Time: {format(new Date(item.endTime), 'hh:mm a')}
                            </Text>
                            <Text style={styles.bodyText}>
                                Exam Date: {format(new Date(item.examDate), 'EEEE dd MMMM yyyy')}
                            </Text>
                        </View>
                        <View style={styles.footer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => navigation.navigate('exam', { examId: item._id })}
                            >
                                <Text style={styles.buttonText}>View Question</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default Landing;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 40,
        alignItems: 'center',
    },
    card: {
        width: '100%',
        maxWidth: 360,
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 4,
    },
    header: {
        backgroundColor: '#007bff',
        padding: 12,
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
    },
    body: {
        padding: 12,
    },
    bodyText: {
        fontSize: 16,
        marginBottom: 6,
    },
    footer: {
        padding: 12,
        borderTopWidth: 1,
        borderColor: '#eee',
        alignItems: 'flex-end',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
