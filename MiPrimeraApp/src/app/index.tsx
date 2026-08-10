import { View, Text, StyleSheet, Button, Alert } from 'react-native';

export default function Index() {
 return (
   <View style={styles.container}>

     <View style={styles.card}>

       <Text style={styles.<titulo}>👨‍💻 Juan Pérez</Text>
>
       <Text style={styles.texto}>📚 Curso: React Native</Text>

       <Text style={styles.texto}>🏫 Universidad Valle Grande</Text>

       <Text style={styles.texto}>📧 juan@correo.com</Text>

       <View style={styles.boton}>
         <Button
           title="Saludar"
           onPress={() => Alert.alert("¡Bienvenido a React Native!")}
         />
       </View>

     </View>

   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#E3F2FD',
   justifyContent: 'center',
   alignItems: 'center',
 },

 card: {
   width: 320,
   backgroundColor: '#FFFFFF',
   padding: 20,
   borderRadius: 15,
   elevation: 8,
 },

 titulo: {
   fontSize: 26,
   fontWeight: 'bold',
   color: '#1565C0',
   textAlign: 'center',
   marginBottom: 20,
 },

 texto: {
   fontSize: 18,
   marginBottom: 10,
 },

 boton: {
   marginTop: 20,
 },
});


