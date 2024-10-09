import { View } from "react-native"
import Saved from "../components/Saved"
// import MenuPanel from "../components/MenuPanel"

const SavedScreen = () => {
    return (
        <View style={styles.container}>
            <Saved />
            {/* <View style={styles.menu}>
                <MenuPanel />
            </View> */}
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

export default SavedScreen;