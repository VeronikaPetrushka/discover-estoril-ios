import { View } from "react-native"
import TopicsExpert from "../components/TopicsExpert"

const TopicsExpertScreen = () => {
    return (
        <View style={styles.container}>
            <TopicsExpert />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default TopicsExpertScreen;