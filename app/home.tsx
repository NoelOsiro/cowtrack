import { StyleSheet, Text, View, Animated, ScrollView} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { NavBar } from '@/components/NavBar'
import { Header } from '@/components/Headers/Header'
import { FarmPopulation} from '@/components/AnimalCount'
import { FarmSummary} from '@/components/FarmSummary'
import RenderChart from '@/components/RenderChart'
import { CategoryHeaderSection } from '@/components/CategoryHeaderSection'
import { CategoryList } from '@/components/Lists/CategoryList'
import { categoriesData, Category } from '@/constants/categoriesData'

type Props = {}


const Home = (props: Props) => {

    const [viewMode, setViewMode] = React.useState("chart")
    const [selectedCategory, setSelectedCategory] = React.useState< Category | null >(null)
    const [showMoreToggle, setShowMoreToggle] = React.useState(false)
    const categoryListHeightAnimationValue = useRef(new Animated.Value(145)).current;
    const [ count, setCount] = useState<any>()
    
    useEffect(() => {
        setCount(selectedCategory?.animals.reduce((sum, animal) => sum + animal.count, 0))
    }, [selectedCategory]);
    

    const [categories, setCategories] = React.useState(categoriesData)
  return (
    <View style={styles.container}>

        {/* Header section */}
        <Header />

        {/* Category Header Section */}
        <CategoryHeaderSection categories={categories} viewMode={viewMode} setViewMode={setViewMode} />
            
        {/* Category List Section */}
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
                {
                    viewMode == "list" &&
                    <View>
                        <CategoryList categories={categories} setSelectedCategory={setSelectedCategory} categoryListHeightAnimationValue={categoryListHeightAnimationValue} showMoreToggle={showMoreToggle} setShowMoreToggle={setShowMoreToggle} /> 
                        <FarmPopulation selectedCategory={selectedCategory} />
                    </View>
                }
                {
                    viewMode == "chart" &&
                    <View>
                        <RenderChart categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} count={count} />
                        <FarmSummary selectedCategory={selectedCategory} categories={categories} setSelectedCategory={setSelectedCategory} />
                    </View>
                }
            </ScrollView>
    </View>
  )
}

export default Home

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    }
})


