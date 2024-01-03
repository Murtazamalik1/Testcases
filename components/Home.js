import React from "react";
import axios from "axios";

import { Text, View, StyleSheet, FlatList, Image, ImageBackground } from "react-native";

class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    };
    componentDidMount() {
        this.getApi();
    }
    getApi = () => {
        axios.get('https://dummyjson.com/products')
            .then((res) => {
                const ApiResponse = res.data
                console.log('------response-------', res.data)
                this.setState({
                    data: res.data
                });
            })
            .catch(error => {
                console.log('fetching data error', error)
            })
    }
    render() {
        return (
            <View>
                <FlatList
                    // style={styles.Container}
                    data={this.state.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.Container}>
                            <View style={styles.productSection}>
                                <View style={styles.productimgSection}>
                                    <Image source={require('../Components/assets/newpHONE.jpg')} style={styles.imageStyle} />
                                    <Text style={styles.description}>{item.description}</Text>
                                </View>
                                <View style={styles.productDetailsSection}>
                                    <Text style={styles.brand}>Brand {item.brand}</Text>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.rating}>rating {item.rating}</Text>
                                    <Text style={styles.price}>${item.price} <Text style={{ fontSize: 15 }}>(30% off)</Text></Text>
                                    {/* <Text style={styles.description}>{item.description}</Text> */}
                                    <Text style={styles.category}>{item.category}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>

        )
    }
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        padding: 2,
    },
    imageStyle: {
        width: '70%',
        height: 100,
        resizeMode: 'contain',
        borderRadius: 50,
    },
    productSection: {
        padding:10,
        borderColor: '#dddddd',
        flexDirection: 'row',
        borderBottomWidth:1
    },
    productimgSection: {
        width: '40%',
        left: 15
    },
    productDetailsSection: {
        width: '60%',
        padding: 1,
        left: 25,
    },
    brand: {
        color: 'black',
        fontSize: 16,
        fontWeight:'bold'
    },
    title: {
        fontSize: 16
    },
    rating: {
        fontSize: 16,
        color: '#ffa534'
    },
    price: {
        fontSize: 18,
        fontWeight: "bold"
    },
    description: {
        fontSize: 16,
    },
    category: {
        color: "#0096fc",
        fontSize: 18
    }

})
export default HomeScreen;