import { View } from "react-native"
import QuizExpert from "../components/QuizExpert"

const QuizExpertScreen = () => {
    return (
        <View style={styles.container}>
            <QuizExpert />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default QuizExpertScreen;