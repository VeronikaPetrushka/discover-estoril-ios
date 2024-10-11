import { View } from "react-native"
import QuizNewcomer from "../components/QuizNewcomer"

const QuizNewcomerScreen = ({route}) => {
    const {topic, level, questions} = route.params;

    return (
        <View style={styles.container}>
            <QuizNewcomer topic={topic} level={level} questions={questions}/>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default QuizNewcomerScreen;