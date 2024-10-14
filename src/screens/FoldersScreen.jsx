import { View } from "react-native"
import Folders from "../components/Folders"

const FoldersScreen = () => {
    return (
        <View style={styles.container}>
            <Folders />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default FoldersScreen;