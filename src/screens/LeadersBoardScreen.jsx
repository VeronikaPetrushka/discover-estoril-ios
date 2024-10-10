import { View } from "react-native"
import LeadersBoard from "../components/LeadersBoard"
import MenuPanel from "../components/MenuPanel"

const LeadersBoardScreen = () => {
    return (
        <View style={styles.container}>
            <LeadersBoard />
            <View style={styles.menu}>
                <MenuPanel />
            </View>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },

    menu: {
        position: 'absolute',
        width: "100%",
        bottom: 30
    }
}

export default LeadersBoardScreen;