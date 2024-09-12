import { COLORS, FONTS, SIZES } from "@/constants";
import { View, Text } from "react-native";

export function renderIncomingAnimalsTitle() {
    return (
        <View style={{ height: 80, backgroundColor: COLORS.lightGray2, padding: SIZES.padding }}>
            {/* Title */}
            <Text style={{ ...FONTS.h3, color: COLORS.primary }}>Animal count</Text>
            <Text style={{ ...FONTS.body4, color: COLORS.darkgray }}>12 Total</Text>
        </View>
    )
}