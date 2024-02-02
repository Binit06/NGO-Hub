import { View, StyleSheet, Text, Button } from 'react-native';
import React, { forwardRef, useMemo } from 'react';
import BottomSheet, { useBottomSheet } from '@gorhom/bottom-sheet';
export type Ref = BottomSheet;

interface Props {
	title: string;
    snapPoints: string[];
    index: number;
}

const CloseBtn = () => {
	const { close } = useBottomSheet();

	return <Button title="Close" onPress={() => close()} />;
};

const CustomBottomSheet = forwardRef<Ref, Props>((props, ref) => {
	const snapPoints = useMemo(() => props.snapPoints, []);

	return (
		<BottomSheet
			ref={ref}
			index={props.index}
			snapPoints={snapPoints}
			enablePanDownToClose={true}
			handleIndicatorStyle={{ backgroundColor: '#fff' }}
			backgroundStyle={{ backgroundColor: '#1d0f4e' }}
		>
			<View style={styles.contentContainer}>
				<Text style={styles.containerHeadline}>{props.title}</Text>
				<CloseBtn />
			</View>
		</BottomSheet>
	);
});

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		alignItems: 'center'
	},
	containerHeadline: {
		fontSize: 24,
		fontWeight: '600',
		padding: 20,
		color: '#fff'
	}
});

export default CustomBottomSheet;