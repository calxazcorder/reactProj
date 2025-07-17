import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import AssessmentCard from '../../components/assesmentCard';
import NewCard from '../../components/addNewCard';
import { ActivityResponse } from '../../types';
import { useCallback, useEffect, useState } from 'react';
import ActivitiesService from '../../services/activitiesService';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';



const ActivitiesScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [activities, setActivities] = useState<ActivityResponse[]>([]);
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<Boolean>(false)


    

    const fetchActivitiesLive = useCallback(async (): Promise<void> => {
        try {
        const fetchedActivities: any[] = await ActivitiesService.getAll();
        setActivities(fetchedActivities);
        } catch (err: unknown) {
        // More specific error handling
        
         if (err instanceof Error) {
            setError(`Failed to fetch activities: ${err.message}`);
        } else {
         setError('Failed to fetch activities: Unknown error');
         }
         console.error('Error fetching activities:', err);
         } finally {
         setLoading(false);
        }
        }, []);
        

    useEffect(() => { 
        const intervalId = setInterval(() => {
            fetchActivitiesLive(); // Call the function
            console.log('fetched', activities)

        }, 1000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array to run only once on mount

    const handleNavigate = (activity: ActivityResponse) => {
        navigation.navigate('Details', {
            criterias: activity.criterias
        });
    };


    return (
        <>
            <ScrollView contentContainerStyle={{ padding: 5 }}>
                <View style={styles.wrapper}>
                    {activities.map((activity, activityIndex) => (
                        <TouchableOpacity 
                            key={`activity-${activityIndex}`} 
                            onPress={() => handleNavigate(activity)}
                        >
                            <AssessmentCard nameOf={activity.title} activity={activity} />
                        </TouchableOpacity>
                    ))}

                    <View style={styles.newCardContainer}>
                        <NewCard />
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center', // Commented out to keep AssessmentCards full width
        gap: 10, // Optional: adds spacing between items if supported
    },
    newCardContainer: {
        alignItems: 'center', // Centers only the NewCard
        minHeight: 300,
        // height: 20
    },
});

export default ActivitiesScreen;
