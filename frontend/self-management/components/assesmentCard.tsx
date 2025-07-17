import { useState, useRef } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, PanResponder } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Adjust path as needed
import ActivitiesService from '../services/activitiesService';

interface Props { 
    nameOf: string;
    activity: any; // Pass the whole activity object for navigation
    onDelete?: () => void; // Optional delete callback
}

const AssessmentCard: React.FC<Props> = ({ nameOf, activity, onDelete = () => {} }: Props) => { 
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [deleteCard, setDeleteCard] = useState<boolean>(false);

    // Navigation handler
    const handleNavigateToDetails = () => {
        console.log('Navigating to details with:', activity);
        navigation.navigate('Details', {
            criterias: activity.criterias || []
        });
    };

    // Swipe detection using PanResponder
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                // Activate pan responder if horizontal movement is significant
                return Math.abs(gestureState.dx) > 20 && Math.abs(gestureState.dy) < 50;
            },
            
            onPanResponderMove: (evt, gestureState) => {
                // You could add visual feedback here (like card sliding)
            },
            
            onPanResponderRelease: (evt, gestureState) => {
                // If swiped left more than 100 pixels, show delete
                if (gestureState.dx < -100) {
                    console.log('Swiped left - showing delete confirmation');
                    setDeleteCard(true);
                }
            },
        })
    ).current;

    const handleConfirmDelete = async () => {
        console.log(`Deleting ${nameOf}...`);
        setDeleteCard(false); // Hide confirmation
        
        try {
            await ActivitiesService.deleteActivity(nameOf);
            console.log("Activity deleted successfully");
            onDelete();
        } catch (error) {
            console.error("Failed to delete activity:", error);
        }
    };

    const handleCancelDelete = () => {
        setDeleteCard(false); // Just hide the confirmation
    };

    // If deleteCard is true, show confirmation overlay
    if (deleteCard) {
        return (
            <View style={styles.card}>
                <Text style={styles.h2}>Delete "{nameOf}"?</Text>
                
                <View style={styles.confirmationButtons}>
                    <TouchableOpacity 
                        style={styles.cancelButton}
                        onPress={handleCancelDelete}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.deleteButton}
                        onPress={handleConfirmDelete}
                    >
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // Normal card view with swipe detection
    return (
        <View style={styles.card} {...panResponder.panHandlers}>
            <TouchableOpacity 
                style={styles.cardContent}
                onPress={handleNavigateToDetails}
                activeOpacity={0.9}
            >
                <Text style={styles.h2}>{nameOf}</Text>
                <View style={styles.totalscore}>
                    {/* Your total score content */}
                </View>
                
                <TouchableOpacity 
                    style={styles.moreAbout}
                    onPress={handleNavigateToDetails}
                >
                    <Text>More Details</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 2,
        borderColor: 'black',
        borderStyle: 'solid',
        width: '90%',
        minHeight: 220,
        alignSelf: 'center',
        marginTop: 16,
        paddingVertical: 10,
    }, 
    cardContent: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    h2: { 
        fontSize: 22,
        textAlign: 'center',
    },
    totalscore: {
        flex: 1,
        borderWidth: 2,
        width: '50%',
        marginTop: 10,
    },
    moreAbout: { 
        borderWidth: 2,
        borderColor: 'black',
        paddingHorizontal: 20,
        paddingVertical: 7,
        marginTop: 10,
        backgroundColor: 'white',
    },
    confirmationButtons: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    cancelButton: {
        backgroundColor: '#ccc',
        padding: 15,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: '#ff4444',
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    }
});

export default AssessmentCard;