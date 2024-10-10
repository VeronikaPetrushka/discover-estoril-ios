import { View } from "react-native"
import Collection from "../components/Collection"

const CollectionScreen = () => {
    return (
        <View style={styles.container}>
            <Collection />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default CollectionScreen;