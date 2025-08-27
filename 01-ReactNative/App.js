//importa os modulos necessarios de react e react-native

import { StyleSheet, Text, View } from "react-native";


//define componente principal da apicação "App"
//A palavra export fala que ele poderá ser puxado de qualquer outro arquivo
export default function App(){
    //o componente retorna uma estrutura de UI (interface de usuario) em JSX
    return(
        //"View" é um container flexivel, equivalente a uma <div>
        <View style={style.container}>
            {/* 'Text' é um componente para utilização de texto */}
            <Text style={style.tittle}>Meu Primeiro App</Text>
            <Text style={style.subtittle}>Bem vindo ao React Native</Text>
        </View>
    );
}

//cria um objeto de estilos usando a API StyleSheet
//otimiza o desnpenho e facilita a organização dos estilos
const style = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#1e93ab",
        alignItems: "center",
        justifyContent: "center"
    },
    tittle:{
        color:"#dcdcdc",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    subtittle:{
        fontSize: 16,
        color:"#d9d9d9"
    }
})