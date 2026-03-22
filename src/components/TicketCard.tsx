import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { Dimensions, View, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth - 30;
const TicketCard = ({ children , height = 100 }) => {
    const width = screenWidth - 44;
    const holeRadius = 12;
    const holeY = height * 0.5;

    const path = `
    M 15 0 
    L ${width - 15} 0 
    Q ${width} 0 ${width} 15 
    L ${width} ${holeY - holeRadius} 
    A ${holeRadius} ${holeRadius} 0 0 0 ${width} ${holeY + holeRadius} 
    L ${width} ${height - 15} 
    Q ${width} ${height} ${width - 15} ${height} 
    L 15 ${height} 
    Q 0 ${height} 0 ${height - 15} 
    L 0 ${holeY + holeRadius} 
    A ${holeRadius} ${holeRadius} 0 0 0 0 ${holeY - holeRadius} 
    L 0 15 
    Q 0 0 15 0 
    Z
  `;

    return (
        <View style={{ width, height, marginVertical: 10, alignItems: 'center', alignSelf: 'center'}}>
            <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
                <Path
                    d={path}
                    fill="#b9cce946"
                    stroke="#e4b58f46"
                    strokeWidth="1"
                />
            </Svg>
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})

export default TicketCard;