import { View } from "react-native"
import MuseumFacts from "../components/MuseumFacts"
import MenuPanel from "../components/MenuPanel"

const MuseumFactsScreen = ({route}) => {
    const {museum, description, famous, factName, fact, facts, images, reward} = route.params;

    return (
        <View style={styles.container}>
            <MuseumFacts 
                museum={museum}
                description={description}
                famous={famous}
                factName={factName}
                fact={fact}
                facts={facts}
                images={images}
                reward={reward}
                />
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

export default MuseumFactsScreen;