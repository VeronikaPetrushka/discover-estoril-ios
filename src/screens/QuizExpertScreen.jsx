import { View } from "react-native"
import QuizExpert from "../components/QuizExpert"

const QuizExpertScreen = ({route}) => {
    const { level, question, events, years, answers, storyName, story} = route.params;

    return (
        <View style={styles.container}>
            <QuizExpert
                level={level} 
                question={question}
                events={events}
                years={years}
                answers={answers}
                storyName={storyName}
                story={story}
             />
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