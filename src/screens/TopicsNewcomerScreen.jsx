import { View } from "react-native"
import TopicsNewcomer from "../components/TopicsNewcomer"

const TopicsNewcomerScreen = () => {
    return (
        <View style={styles.container}>
            <TopicsNewcomer />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default TopicsNewcomerScreen;