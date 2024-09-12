import React, { useState } from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import Svg from 'react-native-svg';
import { VictoryPie, } from 'victory-native';
import { SIZES, FONTS } from '@/constants';
import { setSelectCategoryByName } from '@/utils/setSelectCategoryByName';
import { processCategoryDataToDisplay } from './processCategoryDataToDisplay';
import { Category } from '../constants/categoriesData';

type Props = {
    categories: Category[];
    selectedCategory: Category | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<Category|null>>;
    count: number | null;
};


const RenderChart = ({ categories, selectedCategory, setSelectedCategory,count }: Props) => {
    const chartData = processCategoryDataToDisplay(categories);
    const colorScales = chartData.map(item => item.color);

    const chartView = Platform.OS === 'ios' ? (
        <View  style={styles.container}>
                <Svg width={SIZES.width} height={SIZES.width} style={{width: "100%", height: "auto"}}>

                    <VictoryPie
                        standalone={false} // Android workaround
                        data={chartData}
                        labels={(datum) => `${datum.y}`}
                        radius={({ datum }) => (selectedCategory && selectedCategory.name == datum.name) ? SIZES.width * 0.4 : SIZES.width * 0.4 - 10}
                        innerRadius={70}
                        labelRadius={() => (SIZES.width * 0.4 + 70) / 2.5}
                        style={{
                            labels: { fill: "white" ,fontSize: 16,fontWeight: 'bold'},
                            
                        }}
                        width={SIZES.width}
                        height={SIZES.width}
                        colorScale={colorScales}
                        events={[{
                            target: "data",
                            eventHandlers: {
                                onPress: () => {
                                    return [{
                                        target: "labels",
                                        mutation: (props) => {
                                            let categoryName = chartData[props.index].name
                                            setSelectCategoryByName(categoryName,categories,setSelectedCategory)
                                        }
                                    }]
                                }
                            }
                        }]}
    
                    />
                </Svg>
                <View style={styles.totalExpensesContainer}>
                    <Text style={{ ...FONTS.h1, textAlign: 'center' }}>{count}</Text>
                    <Text style={{ ...FONTS.body3, textAlign: 'center' }}>{selectedCategory?.name}</Text>
                </View>
            </View>
        
    ) : (
        <View  style={styles.container}>
                <Svg width={SIZES.width} height={SIZES.width} style={{width: "100%", height: "auto"}}>

                    <VictoryPie
                        standalone={false} // Android workaround
                        data={chartData}
                        labels={(datum) => `${datum.y}`}
                        radius={({ datum }) => (selectedCategory && selectedCategory.name == datum.name) ? SIZES.width * 0.4 : SIZES.width * 0.4 - 10}
                        innerRadius={70}
                        labelRadius={() => (SIZES.width * 0.4 + 70) / 2.5}
                        style={{
                            labels: { fill: "white" ,fontSize: 16,fontWeight: 'bold'},
                            
                        }}
                        width={SIZES.width}
                        height={SIZES.width}
                        colorScale={colorScales}
                        events={[{
                            target: "data",
                            eventHandlers: {
                                onPress: () => {
                                    return [{
                                        target: "labels",
                                        mutation: (props) => {
                                            let categoryName = chartData[props.index].name
                                            setSelectCategoryByName(categoryName,categories,setSelectedCategory)
                                        }
                                    }]
                                }
                            }
                        }]}
    
                    />
                </Svg>
                <View style={styles.totalExpensesContainer}>
                    <Text style={{ ...FONTS.h1, textAlign: 'center' }}>{count}</Text>
                    <Text style={{ ...FONTS.body3, textAlign: 'center' }}>{selectedCategory?.name}</Text>
                </View>
            </View>
    );

    return (
        <View style={styles.container}>
            {chartView}
            <View style={styles.totalExpensesContainer}>
                <Text style={FONTS.h1}>{count}</Text>
                <Text style={{ ...FONTS.body3, textAlign: 'center' }}>{selectedCategory?.name}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    svg: {
        width: "100%",
        height: "auto",
    },
    totalExpensesContainer: {
        position: 'absolute',
        top: '42%',
        left: '42%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default RenderChart;



