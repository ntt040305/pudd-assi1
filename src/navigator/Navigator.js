import React from 'react';
import { StatusBar, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import DrawScreen from '../screens/DrawScreen';
import GalleryScreen from '../screens/GalleryScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
	tabBarStyle: {
		backgroundColor: '#0B1324',
		borderTopWidth: 1,
		borderTopColor: '#1E293B',
		height: 72,
		paddingTop: 8,
		paddingBottom: 8,
		elevation: 12,
		shadowColor: '#000',
		shadowOpacity: 0.18,
		shadowOffset: { width: 0, height: -4 },
		shadowRadius: 12,
	},
	tabBarItemStyle: {
		paddingVertical: 3,
	},
	tabBarLabelText: {
		fontSize: 13,
		fontWeight: '700',
		letterSpacing: 0.4,
		lineHeight: 16,
		textAlign: 'center',
		marginTop: 4,
	},
	tabBarLabelActive: {
		color: '#38BDF8',
	},
	tabBarLabelInactive: {
		color: '#64748B',
	},
	headerStyle: {
		backgroundColor: '#0F172A',
	},
	headerTitleStyle: {
		fontWeight: 'bold',
	},
	contentStyle: {
		backgroundColor: '#0F172A',
	},
});

const statusBarProps = {
	barStyle: 'light-content',
	backgroundColor: '#0F172A',
};

const tabScreenOptions = {
	headerShown: false,
	tabBarStyle: styles.tabBarStyle,
	tabBarItemStyle: styles.tabBarItemStyle,
	tabBarShowLabel: true,
	tabBarActiveTintColor: '#38BDF8',
	tabBarInactiveTintColor: '#64748B',
};

const stackScreenOptions = {
	headerStyle: styles.headerStyle,
	headerTintColor: '#fff',
	headerTitleStyle: styles.headerTitleStyle,
	headerShadowVisible: false,
	contentStyle: styles.contentStyle,
};

function renderTabLabel(label, focused) {
	return <Text style={[styles.tabBarLabelText, focused ? styles.tabBarLabelActive : styles.tabBarLabelInactive]}>{label}</Text>;
}

function TabNavigator() {
	return (
		<Tab.Navigator screenOptions={tabScreenOptions}>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{ tabBarLabel: ({ focused }) => renderTabLabel('Home', focused) }}
			/>
			<Tab.Screen
				name="Gallery"
				component={GalleryScreen}
				options={{ tabBarLabel: ({ focused }) => renderTabLabel('Gallery', focused) }}
			/>
		</Tab.Navigator>
	);
}

export default function Navigator() {
	return (
		<NavigationContainer>
			<StatusBar {...statusBarProps} />
			<Stack.Navigator initialRouteName="Tabs" screenOptions={stackScreenOptions}>
				<Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
				<Stack.Screen name="Draw" component={DrawScreen} options={{ title: 'Studio' }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}