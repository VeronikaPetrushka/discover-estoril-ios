import { View } from "react-native"
import FolderDetails from "../components/FolderDetails"

const FolderDetailsScreen = ({route}) => {
    const { folder } = route.params;

    return (
        <View style={styles.container}>
            <FolderDetails folder={folder}/>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default FolderDetailsScreen;