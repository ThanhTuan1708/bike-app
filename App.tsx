import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';


const BIKES_DATA = [
  {
    id: '1',
    name: 'Pinarello',
    price: 1800,
    originalPrice: 1350,
    discount: '15% OFF',
    category: 'Roadbike',
    description: 'It is a very important form of work that uses frames, wheels and components to build a bike.',
    image: require('./assets/bluebike.png'),
    isFavorite: true,
  },
  {
    id: '2',
    name: 'Pina Mountain',
    price: 1700,
    originalPrice: 1500,
    discount: '10% OFF',
    category: 'Mountain',
    description: 'A durable mountain bike built for rugged terrain and steep climbs.',
    image: require('./assets/Bike1.png'),
    isFavorite: false,
  },
  {
    id: '3',
    name: 'Pina Bike',
    price: 1500,
    originalPrice: 1350,
    discount: '15% OFF',
    category: 'Roadbike',
    description: 'Lightweight road bike designed for speed and endurance racing.',
    image: require('./assets/Bike2.png'),
    isFavorite: false,
  },
  {
    id: '4',
    name: 'Pinarello',
    price: 1900,
    originalPrice: 1700,
    discount: '20% OFF',
    category: 'Roadbike',
    description: 'Top-tier racing bike crafted with carbon fiber materials.',
    image: require('./assets/Bike3.png'),
    isFavorite: false,
  },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<1 | 2 | 3>(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBike, setSelectedBike] = useState(BIKES_DATA[0]);


  const renderScreen1 = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.headerText}>
        A premium online store for sporter and their stylish choice
      </Text>

      <View style={styles.imageContainer01}>
        <Image
          source={require('./assets/bluebike.png')}
          style={styles.bikeImageFull}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.titleText}>POWER BIKE{'\n'}SHOP</Text>

      <TouchableOpacity
        style={styles.buttonRed}
        activeOpacity={0.8}
        onPress={() => setCurrentScreen(2)}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );


  const renderScreen2 = () => {
    const filteredBikes = BIKES_DATA.filter(
      (b) => selectedCategory === 'All' || b.category === selectedCategory
    );

    return (
      <View style={styles.screenContainer}>
        <Text style={styles.headerTitleRed}>The world's Best Bike</Text>

        <View style={styles.categoryRow}>
          {['All', 'Roadbike', 'Mountain'].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryBtn,
                selectedCategory === cat && styles.categoryBtnActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryTxt,
                  selectedCategory === cat && styles.categoryTxtActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredBikes}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.rowWrapper}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => {
                setSelectedBike(item);
                setCurrentScreen(3);
              }}
            >
              <Text style={[styles.heartIcon, item.isFavorite && styles.heartActive]}>
                ♥
              </Text>
              <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardPrice}>
                <Text style={styles.orangeDollar}>$</Text> {item.price}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };


  const renderScreen3 = () => (
    <ScrollView style={styles.screenContainer} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={() => setCurrentScreen(2)} style={styles.backBtn}>
        <Text style={styles.backTxt}>‹ Back</Text>
      </TouchableOpacity>

      <View style={styles.imageContainer03}>
        <Image source={selectedBike.image} style={styles.bikeImageFull} resizeMode="contain" />
      </View>

      <Text style={styles.detailName}>{selectedBike.name}</Text>

      <View style={styles.priceRow}>
        <Text style={styles.discountTxt}>{selectedBike.discount}</Text>
        <Text style={styles.originalPrice}>${selectedBike.originalPrice}</Text>
        <Text style={styles.detailPrice}>${selectedBike.price}</Text>
      </View>

      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.descriptionTxt}>{selectedBike.description}</Text>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.heartBtn}>
          <Text style={styles.heartBtnTxt}>♥</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addToCartBtn}
          activeOpacity={0.8}
          onPress={() => alert('Added to cart!')}
        >
          <Text style={styles.buttonText}>Add to card</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      {currentScreen === 1 && renderScreen1()}
      {currentScreen === 2 && renderScreen2()}
      {currentScreen === 3 && renderScreen3()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  screenContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  headerText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#000',
    marginBottom: 15,
  },
  imageContainer01: {
    backgroundColor: '#E9D9D8',
    borderRadius: 20,
    padding: 15,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bikeImageFull: {
    width: '100%',
    height: '100%',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  buttonRed: {
    backgroundColor: '#E94141',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitleRed: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E94141',
    marginBottom: 15,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  categoryBtn: {
    borderWidth: 1,
    borderColor: '#E94141',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  categoryBtnActive: {
    backgroundColor: 'rgba(233, 65, 65, 0.1)',
  },
  categoryTxt: {
    color: '#BEB6B6',
    fontWeight: '500',
  },
  categoryTxtActive: {
    color: '#E94141',
  },
  rowWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#F7BA8226',
    borderRadius: 12,
    padding: 10,
    width: '47%',
    alignItems: 'center',
  },
  heartIcon: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: '#BEB6B6',
  },
  heartActive: {
    color: '#E94141',
  },
  cardImage: {
    width: 100,
    height: 100,
    marginVertical: 8,
  },
  cardName: {
    fontSize: 14,
    color: '#00000099',
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orangeDollar: {
    color: '#F7BA82',
  },
  backBtn: {
    marginBottom: 10,
  },
  backTxt: {
    fontSize: 18,
    color: '#E94141',
    fontWeight: 'bold',
  },
  imageContainer03: {
    backgroundColor: '#E9D9D8',
    borderRadius: 20,
    padding: 15,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  discountTxt: {
    color: '#00000099',
    fontSize: 16,
    marginRight: 15,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    fontSize: 16,
    color: '#000',
    marginRight: 15,
  },
  detailPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  descriptionTxt: {
    color: '#00000099',
    lineHeight: 20,
    marginBottom: 20,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  heartBtn: {
    padding: 10,
  },
  heartBtnTxt: {
    fontSize: 28,
    color: '#000',
  },
  addToCartBtn: {
    backgroundColor: '#E94141',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
});