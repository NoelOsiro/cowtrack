import React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import Svg from 'react-native-svg';
import { VictoryPie, } from 'victory-native';
import { SIZES, FONTS } from '@/constants';
import { setSelectCategoryByName } from './home';
import { processCategoryDataToDisplay } from './processCategoryDataToDisplay';
import { Category } from './categoriesData';

type Props = {
    categories: Category[];
    selectedCategory: any;
    setSelectedCategory: React.Dispatch<React.SetStateAction<Category|null>>;
};

const RenderChart = ({ categories, selectedCategory, setSelectedCategory }: Props) => {
    const chartData = processCategoryDataToDisplay(categories);
    const colorScales = chartData.map(item => item.color);
    const totalExpenseCount = chartData.reduce((a, b) => a + (b.expenseCount || 0), 0);

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
                            labels: { fill: "black" ,fontSize: 20,fontWeight: 'bold'},
                            
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
                    <Text style={{ ...FONTS.h1, textAlign: 'center' }}>{totalExpenseCount}</Text>
                    <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Expenses</Text>
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
                            labels: { fill: "black" ,fontSize: 20,fontWeight: 'bold'},
                            
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
                    <Text style={{ ...FONTS.h1, textAlign: 'center' }}>{totalExpenseCount}</Text>
                    <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Expenses</Text>
                </View>
            </View>
    );

    return (
        <View style={styles.container}>
            {chartView}
            <View style={styles.totalExpensesContainer}>
                <Text style={FONTS.h1}>{totalExpenseCount}</Text>
                <Text style={FONTS.body3}>Expenses</Text>
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



