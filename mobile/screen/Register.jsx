import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Button, Card, Divider, MD3Colors, Snackbar, TextInput } from 'react-native-paper'
import { useMobileRegisterMutation } from '../redus/api/auth.api'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading'
import * as ImagePicker from 'expo-image-picker';

const Register = () => {
    const { navigate } = useNavigation()
    const [signup, { isSuccess, isLoading, isError, error, reset }] = useMobileRegisterMutation()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
            email: "",
            mobile: "",
            password: "",
            cpassword: "",
            picture: "",
        },
        validationSchema: yup.object({
            name: yup.string().required(),
            email: yup.string().required().email(),
            mobile: yup.string().required(),
            password: yup.string().required(),
            cpassword: yup.string().required().oneOf([yup.ref("password")]),
            picture: yup.string().required(),
        }),
        onSubmit: (values, { resetForm }) => {
            signup(values)
            resetForm()
        }
    })

    const handleImagePick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true,
            allowsEditing: false,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            formik.setFieldValue('picture', result.assets[0].uri);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            navigate("login")
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            console.log(error)
        }
    }, [isError])

    if (isLoading) {
        return <Loading />
    }

    return <View style={{
        padding: 15,
        flex: 1,
        justifyContent: "center",
    }}>

        <Text>{JSON.stringify(formik.errors, null, 2)}</Text>
        <Card>
            <Card.Title title='sig nup ' />
            <Card.Content style={{ gap: 15 }}>
                <TextInput
                    keyboardType='default'
                    value={formik.values.name}
                    onChangeText={formik.handleChange("name")}
                    onBlur={formik.handleBlur("name")}
                    error={formik.touched.name && formik.errors.name}
                    mode='outlined' label='Enter Your Name'
                />
                {
                    formik.touched.name
                    && formik.errors.name
                    && <Text style={{ color: MD3Colors.error50 }}>{formik.errors.name}</Text>
                }

                <TextInput
                    keyboardType='email-address'
                    value={formik.values.email}
                    onChangeText={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    error={formik.touched.email && formik.errors.email}
                    mode='outlined' label='Enter Your Email'
                />
                {
                    formik.touched.email
                    && formik.errors.email
                    && <Text style={{ color: MD3Colors.error50 }}>{formik.errors.email}</Text>
                }

                <TextInput
                    keyboardType='number-pad'
                    value={formik.values.mobile}
                    onChangeText={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                    error={formik.touched.mobile && formik.errors.mobile}
                    mode='outlined' label='Enter Your Mobile Number'
                />
                {
                    formik.touched.mobile
                    && formik.errors.mobile
                    && <Text style={{ color: MD3Colors.error50 }}>{formik.errors.mobile}</Text>
                }

                <TextInput
                    secureTextEntry
                    value={formik.values.password}
                    onChangeText={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                    error={formik.touched.password && formik.errors.password}
                    mode='outlined' label='Enter Your Password'
                />
                {
                    formik.touched.password
                    && formik.errors.password
                    && <Text style={{ color: MD3Colors.error50 }}>{formik.errors.password}</Text>
                }

                <TextInput
                    secureTextEntry
                    values={formik.values.cpassword}
                    onChangeText={formik.handleChange("cpassword")}
                    onBlur={formik.handleBlur("cpassword")}
                    error={formik.touched.cpassword && formik.errors.cpassword}
                    mode='outlined' label='Enter Your  CPassword'
                />
                {
                    formik.touched.cpassword
                    && formik.errors.cpassword
                    && <Text style={{ color: MD3Colors.error50 }}>{formik.errors.cpassword}</Text>
                }
                {/* <Button Title="Choose File" onPress={handeleDoc} /> */}
                <Button mode="outlined" onPress={handleImagePick}>
                    Choose Profile Image
                </Button>

                {formik.values.picture ? (
                    <Image
                        source={{ uri: formik.values.picture }}
                        style={styles.imagePreview}
                    />
                ) : null}

                {formik.touched.picture && formik.errors.picture && (
                    <Text style={styles.errorText}>{formik.errors.picture}</Text>
                )}


                <Button onPress={formik.handleSubmit} mode='contained'>Register</Button>
                <Divider></Divider>
                <Button onPress={e => navigate("login")}>Already Have Account? Login </Button>
            </Card.Content>
        </Card>
        {
            isSuccess && <Snackbar
                visible={isSuccess}
                onDismiss={reset}
                duration={2000}
            >Register Success</Snackbar>
        }

        {
            isError && <Snackbar
                visible={isError}
                onDismiss={reset}
                duration={2000}
            >{error.data ? error.data.message : "unable to success"}</Snackbar>
        }
    </View>
}

export default Register

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        justifyContent: 'center',
    },
    errorText: {
        color: MD3Colors.error50,
    },
    imagePreview: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 10,
    }
})





// import { StyleSheet, Text, View, Image } from 'react-native';
// import React, { useEffect } from 'react';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import { Button, Card, Divider, MD3Colors, Snackbar, TextInput } from 'react-native-paper';
// import { useMobileRegisterMutation } from '../redus/api/auth.api';
// import { useNavigation } from '@react-navigation/native';
// import Loading from '../components/Loading';
// import * as ImagePicker from 'expo-image-picker';

// const Register = () => {
//     const { navigate } = useNavigation();
//     const [signup, { isSuccess, isLoading, isError, error, reset }] = useMobileRegisterMutation();

//     const formik = useFormik({
//         enableReinitialize: true,
//         initialValues: {
//             name: '',
//             email: '',
//             mobile: '',
//             password: '',
//             cpassword: '',
//             picture: '',
//         },
//         validationSchema: yup.object({
//             name: yup.string().required(),
//             email: yup.string().required().email(),
//             mobile: yup.string().required(),
//             password: yup.string().required(),
//             cpassword: yup.string().required().oneOf([yup.ref("password")]),
//             picture: yup.string().required(),
//         }),
//         onSubmit: (values, { resetForm }) => {
//             signup(values);
//             resetForm();
//         },
//     });

//     const handleImagePick = async () => {
//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             // allowsEditing: true,
//             allowsEditing: false,
//             aspect: [1, 1],
//             quality: 0.7,
//         });

//         if (!result.canceled) {
//             formik.setFieldValue('picture', result.assets[0].uri);
//         }
//     };

//     useEffect(() => {
//         if (isSuccess) {
//             navigate('login');
//         }
//     }, [isSuccess]);

//     useEffect(() => {
//         if (isError) {
//             console.log(error);
//         }
//     }, [isError]);

//     if (isLoading) {
//         return <Loading />;
//     }

//     return (
//         <View style={styles.container}>
//             <Card>
//                 <Card.Title title="Sign Up" />
//                 <Card.Content style={{ gap: 15 }}>
//                     <TextInput
//                         keyboardType="default"
//                         value={formik.values.name}
//                         onChangeText={formik.handleChange('name')}
//                         onBlur={formik.handleBlur('name')}
//                         error={formik.touched.name && formik.errors.name}
//                         mode="outlined"
//                         label="Enter Your Name"
//                     />
//                     {formik.touched.name && formik.errors.name && (
//                         <Text style={styles.errorText}>{formik.errors.name}</Text>
//                     )}

//                     <TextInput
//                         keyboardType="email-address"
//                         value={formik.values.email}
//                         onChangeText={formik.handleChange('email')}
//                         onBlur={formik.handleBlur('email')}
//                         error={formik.touched.email && formik.errors.email}
//                         mode="outlined"
//                         label="Enter Your Email"
//                     />
//                     {formik.touched.email && formik.errors.email && (
//                         <Text style={styles.errorText}>{formik.errors.email}</Text>
//                     )}

//                     <TextInput
//                         keyboardType="number-pad"
//                         value={formik.values.mobile}
//                         onChangeText={formik.handleChange('mobile')}
//                         onBlur={formik.handleBlur('mobile')}
//                         error={formik.touched.mobile && formik.errors.mobile}
//                         mode="outlined"
//                         label="Enter Your Mobile Number"
//                     />
//                     {formik.touched.mobile && formik.errors.mobile && (
//                         <Text style={styles.errorText}>{formik.errors.mobile}</Text>
//                     )}

//                     <TextInput
//                         secureTextEntry
//                         value={formik.values.password}
//                         onChangeText={formik.handleChange('password')}
//                         onBlur={formik.handleBlur('password')}
//                         error={formik.touched.password && formik.errors.password}
//                         mode="outlined"
//                         label="Enter Your Password"
//                     />
//                     {formik.touched.password && formik.errors.password && (
//                         <Text style={styles.errorText}>{formik.errors.password}</Text>
//                     )}

//                     <TextInput
//                         secureTextEntry
//                         value={formik.values.cpassword}
//                         onChangeText={formik.handleChange('cpassword')}
//                         onBlur={formik.handleBlur('cpassword')}
//                         error={formik.touched.cpassword && formik.errors.cpassword}
//                         mode="outlined"
//                         label="Enter Confirm Password"
//                     />
//                     {formik.touched.cpassword && formik.errors.cpassword && (
//                         <Text style={styles.errorText}>{formik.errors.cpassword}</Text>
//                     )}

//                     <Button mode="outlined" onPress={handleImagePick}>
//                         Choose Profile Image
//                     </Button>

//                     {formik.values.picture ? (
//                         <Image
//                             source={{ uri: formik.values.picture }}
//                             style={styles.imagePreview}
//                         />
//                     ) : null}

//                     {formik.touched.picture && formik.errors.picture && (
//                         <Text style={styles.errorText}>{formik.errors.picture}</Text>
//                     )}

//                     <Button onPress={formik.handleSubmit} mode="contained">
//                         Register
//                     </Button>
//                     <Divider />
//                     <Button onPress={() => navigate('login')}>Already Have Account? Login</Button>
//                 </Card.Content>
//             </Card>

//             {isSuccess && (
//                 <Snackbar visible={isSuccess} onDismiss={reset} duration={2000}>
//                     Register Success
//                 </Snackbar>
//             )}

//             {isError && (
//                 <Snackbar visible={isError} onDismiss={reset} duration={2000}>
//                     {error?.data?.message || 'Unable to register'}
//                 </Snackbar>
//             )}
//         </View>
//     );
// };

// export default Register;

// const styles = StyleSheet.create({
//     container: {
//         padding: 15,
//         flex: 1,
//         justifyContent: 'center',
//     },
//     errorText: {
//         color: MD3Colors.error50,
//     },
//     imagePreview: {
//         width: 100,
//         height: 100,
//         borderRadius: 50,
//         alignSelf: 'center',
//         marginTop: 10,
//     },
// });
