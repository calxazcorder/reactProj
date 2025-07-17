import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Grading from '../../components/grading';
import { CriteriaResponse } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const Details = ({ route }: Props) => {
  const { criterias } = route.params;

  // Safeguard against undefined/null criterias
  if (!criterias || !Array.isArray(criterias)) {
    return (
      <View style={styles.divvi}>
        <Text>No criteria available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.divvi}>
      {criterias.map((criteria, index) => {
        // Debug the actual values
        console.log(`Criteria ${index}:`, criteria);
        console.log(`Raw yesNo:`, criteria.assesment?.yesNo);
        console.log(`Type of yesNo:`, typeof criteria.assesment?.yesNo);
        console.log(`Is it exactly false?:`, criteria.assesment?.yesNo === false);
        console.log(`Is it exactly true?:`, criteria.assesment?.yesNo === true);
        
        return (
          <View key={index} style={styles.submitWrap}>
            <Grading yesNo={criteria.yesNo} name={criteria.name} />
            <TouchableOpacity
              style={styles.submitButt}
              accessibilityLabel="Submit today's scores"
            >
              <Text>Submit today's scores</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  divvi: {
    padding: 10,
    backgroundColor: '#eee',
    borderColor: 'black',
    borderWidth: 2,
  },
  submitButt: {
    borderColor: 'black',
    borderWidth: 2,
    alignSelf: 'center',
    padding: 20,
  },
  submitWrap: {
    display: 'flex',
    gap: 20,
  },
});

export default Details;
