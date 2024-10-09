import { View } from "react-native"
import Collection from "../components/Collection"
// import MenuPanel from "../components/MenuPanel"

const CollectionScreen = () => {
    return (
        <View style={styles.container}>
            <Collection />
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

export default CollectionScreen;