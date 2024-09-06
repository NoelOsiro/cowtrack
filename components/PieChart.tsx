import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { PieChart as DonutChart, Path } from 'react-native-svg';

interface DataItem {
    label: string;
    value: number;
    icon: string;
    color: string;
}

interface PieChartProps {
    data: DataItem[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
    return (
        <ThemedView style={styles.container}>
            {data.map((item, index) => (
                <ThemedView key={index} style={styles.item}>
                    <Ionicons name={'airplane'} size={24} color="black" />
                    <DonutChart style={styles.donut} data={data} innerRadius={50} outerRadius={70}>
                        {data.map((item, index) => (
                            <Path
                                key={index}
                                d={item.icon}
                                fill={item.color}
                            />
                        ))}
                    </DonutChart>
                </ThemedView>
            ))}
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        marginLeft: 8,
    },
    value: {
        marginLeft: 4,
        fontWeight: 'bold',
    },
});

export default PieChart;