import React from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Discover = () => {
    const navigation = useNavigation();

    const navigateToMore = () => {
      navigation.navigate('More');
    };
  
  const navigateToDashboard = () => {
      navigation.navigate('Dashboard');
  };

  const navigateToPortfolio = () => {
      navigation.navigate('Portfolio');
  };

  const navigateToDiscover = () => {
      navigation.navigate('Discover');
  };


    const handleSeeAll = () => {
      // Navigate to the AllStocks screen
      navigation.navigate('AllStock');
    };

    const navigateTo = (screen) => {
      navigation.navigate(screen);
    };

  return (
    <>
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Discover</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#333" style={styles.searchIcon} />
        <TextInput placeholder="Search stock" style={styles.searchInput} />
      </View>

      {/* Stocks Section */}
      <View style={styles.stocksSection}>
      <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular this week</Text>
            <TouchableOpacity onPress={handleSeeAll}>
            <Text style={styles.seeAll}  onPress={() => navigateTo('Popular')}>See All</Text>
            </TouchableOpacity>
        </View>

        {/* Horizontal Scroll for Stocks List */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stocksList}>
          {/* Sample Stock Item (repeat this for each stock) */}
          <View style={styles.stockItem}>
            <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4ItaRkS3bwr28uIwDhx7ZjrO0rMThIECiiggTqr5iRu-Xkk1mjFyifiL2lSEjyFybTvA&usqp=CAU' }} style={styles.stockImage1} />
            <Text style={styles.stockName}>Stock Name</Text>
            <Text style={styles.stockDescription}>Stock Description</Text>
          </View>
          {/* Repeat... */}
          {/* Sample Stock Item (repeat this for each stock) */}
          <View style={styles.stockItem}>
            <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4ItaRkS3bwr28uIwDhx7ZjrO0rMThIECiiggTqr5iRu-Xkk1mjFyifiL2lSEjyFybTvA&usqp=CAU' }} style={styles.stockImage1} />
            <Text style={styles.stockName}>Stock Name</Text>
            <Text style={styles.stockDescription}>Stock Description</Text>
          </View>
          {/* Sample Stock Item (repeat this for each stock) */}
          <View style={styles.stockItem}>
            <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4ItaRkS3bwr28uIwDhx7ZjrO0rMThIECiiggTqr5iRu-Xkk1mjFyifiL2lSEjyFybTvA&usqp=CAU' }} style={styles.stockImage1} />
            <Text style={styles.stockName}>Stock Name</Text>
            <Text style={styles.stockDescription}>Stock Description</Text>
          </View>
          {/* Sample Stock Item (repeat this for each stock) */}
          <View style={styles.stockItem}>
            <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4ItaRkS3bwr28uIwDhx7ZjrO0rMThIECiiggTqr5iRu-Xkk1mjFyifiL2lSEjyFybTvA&usqp=CAU' }} style={styles.stockImage1} />
            <Text style={styles.stockName}>Stock Name</Text>
            <Text style={styles.stockDescription}>Stock Description</Text>
          </View>
          {/* Sample Stock Item (repeat this for each stock) */}
          <View style={styles.stockItem}>
            <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4ItaRkS3bwr28uIwDhx7ZjrO0rMThIECiiggTqr5iRu-Xkk1mjFyifiL2lSEjyFybTvA&usqp=CAU' }} style={styles.stockImage1} />
            <Text style={styles.stockName}>Stock Name</Text>
            <Text style={styles.stockDescription}>Stock Description</Text>
          </View>
        </ScrollView>
        
      </View>

      {/* Stocks Section */}
      <View style={styles.stocksSection}>
      <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sectors</Text>
            <TouchableOpacity onPress={handleSeeAll}>
            <Text style={styles.seeAll} onPress={() => navigateTo('Sectors')}>See All</Text>
            </TouchableOpacity>
        </View>

        {/* Horizontal Scroll for Stocks List */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stocksList}>
          {/* Sample Stock Item (repeat this for each stock) */}
          <View style={styles.stockItem}>
            <Image source={{ uri: 'https://cdn.sanity.io/images/kts928pd/production/acf71dc493554cc492578b8b5b8beb4ee20e8873-731x731.png' }} style={styles.stockImage3} />
            <Text style={styles.stockName}>Stock Name</Text>
            <Text style={styles.stockDescription}>Stock Description</Text>
          </View>
          {/* Repeat... */}
          {/* Sample Stock Item (repeat this for each stock) */}
          <View style={styles.stockItem}>
            <Image source={{ uri: 'https://cdn.sanity.io/images/kts928pd/production/acf71dc493554cc492578b8b5b8beb4ee20e8873-731x731.png' }} style={styles.stockImage3} />
            <Text style={styles.stockName}>Stock Name</Text>
            <Text style={styles.stockDescription}>Stock Description</Text>
          </View>
          {/* Sample Stock Item (repeat this for each stock) */}
          <View style={styles.stockItem}>
            <Image source={{ uri: 'https://cdn.sanity.io/images/kts928pd/production/acf71dc493554cc492578b8b5b8beb4ee20e8873-731x731.png' }} style={styles.stockImage3} />
            <Text style={styles.stockName}>Stock Name</Text>
            <Text style={styles.stockDescription}>Stock Description</Text>
          </View>
          {/* Sample Stock Item (repeat this for each stock) */}
          <View style={styles.stockItem}>
            <Image source={{ uri: 'https://cdn.sanity.io/images/kts928pd/production/acf71dc493554cc492578b8b5b8beb4ee20e8873-731x731.png' }} style={styles.stockImage3} />
            <Text style={styles.stockName}>Stock Name</Text>
            <Text style={styles.stockDescription}>Stock Description</Text>
          </View>
          {/* Sample Stock Item (repeat this for each stock) */}
          <View style={styles.stockItem}>
            <Image source={{ uri: 'https://cdn.sanity.io/images/kts928pd/production/acf71dc493554cc492578b8b5b8beb4ee20e8873-731x731.png' }} style={styles.stockImage3} />
            <Text style={styles.stockName}>Stock Name</Text>
            <Text style={styles.stockDescription}>Stock Description</Text>
          </View>
        </ScrollView>
        
      </View>

      {/* Stocks Section */}
      <View style={styles.stocksSection}>
      <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>UK Stocks</Text>
            <TouchableOpacity onPress={handleSeeAll}>
            <Text style={styles.seeAll} onPress={() => navigateTo('UKStock')}>See All</Text>
            </TouchableOpacity>
      </View>

        {/* Horizontal Scroll for Stocks List */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stocksList}>
          {/* Sample Stock Item (repeat this for each stock) */}
          <View style={styles.stockItem}>
            <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQHgmT7TNrUJ1pbmrYPPEKMzQWfc1W2nNOWzSHEHs_Ciok5U1-ApcelkwlFgVwbTVNTmM&usqp=CAU' }} style={styles.stockImage} />
            <Text style={styles.stockName}>Stock Name</Text>
            <Text style={styles.stockDescription}>Stock Description</Text>
          </View>
          {/* Repeat... */}
          {/* Sample Stock Item (repeat this for each stock) */}
          <View style={styles.stockItem}>
            <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQHgmT7TNrUJ1pbmrYPPEKMzQWfc1W2nNOWzSHEHs_Ciok5U1-ApcelkwlFgVwbTVNTmM&usqp=CAU' }} style={styles.stockImage} />
            <Text style={styles.stockName}>Stock Name</Text>
            <Text style={styles.stockDescription}>Stock Description</Text>
          </View>
          {/* Sample Stock Item (repeat this for each stock) */}
          <View style={styles.stockItem}>
            <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQHgmT7TNrUJ1pbmrYPPEKMzQWfc1W2nNOWzSHEHs_Ciok5U1-ApcelkwlFgVwbTVNTmM&usqp=CAU' }} style={styles.stockImage} />
            <Text style={styles.stockName}>Stock Name</Text>
            <Text style={styles.stockDescription}>Stock Description</Text>
          </View>
          {/* Sample Stock Item (repeat this for each stock) */}
          <View style={styles.stockItem}>
            <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQHgmT7TNrUJ1pbmrYPPEKMzQWfc1W2nNOWzSHEHs_Ciok5U1-ApcelkwlFgVwbTVNTmM&usqp=CAU' }} style={styles.stockImage} />
            <Text style={styles.stockName}>Stock Name</Text>
            <Text style={styles.stockDescription}>Stock Description</Text>
          </View>
          {/* Sample Stock Item (repeat this for each stock) */}
          <View style={styles.stockItem}>
            <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQHgmT7TNrUJ1pbmrYPPEKMzQWfc1W2nNOWzSHEHs_Ciok5U1-ApcelkwlFgVwbTVNTmM&usqp=CAU' }} style={styles.stockImage} />
            <Text style={styles.stockName}>Stock Name</Text>
            <Text style={styles.stockDescription}>Stock Description</Text>
          </View>
        </ScrollView>
        
      </View>

      

      {/* Stocks Section */}
      <View style={styles.stocksSection}>
      <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>US Stocks</Text>
            <TouchableOpacity onPress={handleSeeAll}>
            <Text style={styles.seeAll} onPress={() => navigateTo('USStock')}>See All</Text>
            </TouchableOpacity>
        </View>

        {/* Horizontal Scroll for Stocks List */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stocksList}>
          {/* Sample Stock Item (repeat this for each stock) */}
          <View style={styles.stockItem}>
            <Image source={{ uri: 'https://www.shutterstock.com/image-vector/abstract-simple-united-states-america-600nw-1956065347.jpg' }} style={styles.stockImage} />
            <Text style={styles.stockName}>Stock Name</Text>
            <Text style={styles.stockDescription}>Stock Description</Text>
          </View>
          {/* Repeat... */}
          {/* Sample Stock Item (repeat this for each stock) */}
          <View style={styles.stockItem}>
            <Image source={{ uri: 'https://www.shutterstock.com/image-vector/abstract-simple-united-states-america-600nw-1956065347.jpg' }} style={styles.stockImage} />
            <Text style={styles.stockName}>Stock Name</Text>
            <Text style={styles.stockDescription}>Stock Description</Text>
          </View>
          {/* Sample Stock Item (repeat this for each stock) */}
          <View style={styles.stockItem}>
            <Image source={{ uri: 'https://www.shutterstock.com/image-vector/abstract-simple-united-states-america-600nw-1956065347.jpg' }} style={styles.stockImage} />
            <Text style={styles.stockName}>Stock Name</Text>
            <Text style={styles.stockDescription}>Stock Description</Text>
          </View>
          {/* Sample Stock Item (repeat this for each stock) */}
          <View style={styles.stockItem}>
            <Image source={{ uri: 'https://www.shutterstock.com/image-vector/abstract-simple-united-states-america-600nw-1956065347.jpg' }} style={styles.stockImage} />
            <Text style={styles.stockName}>Stock Name</Text>
            <Text style={styles.stockDescription}>Stock Description</Text>
          </View>
          {/* Sample Stock Item (repeat this for each stock) */}
          <View style={styles.stockItem}>
            <Image source={{ uri: 'https://www.shutterstock.com/image-vector/abstract-simple-united-states-america-600nw-1956065347.jpg' }} style={styles.stockImage} />
            <Text style={styles.stockName}>Stock Name</Text>
            <Text style={styles.stockDescription}>Stock Description</Text>
          </View>
        </ScrollView>
        
      </View>

      {/* News Section */}
      <View style={styles.newsSection}>
      <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Stocks News</Text>
            <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>News</Text>

        {/* List of Stock News */}
        <ScrollView style={styles.newsList}>
          {/* Sample News Item (repeat this for each news) */}
          <View style={styles.newsItem}>
            <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIMqIF9VPmuROuNlAIaZnIdZrgs-Y6GZ4fQLOXlKl9pbdTmf9DKM9B9EfsehuPpm6deWE&usqp=CAU' }} style={styles.newsImage} />
            <Text style={styles.newsTitle}>News Title</Text>
            <Text style={styles.stockDescription}>Stock Description</Text>
          </View>
           {/* Sample News Item (repeat this for each news) */}
           <View style={styles.newsItem}>
            <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIMqIF9VPmuROuNlAIaZnIdZrgs-Y6GZ4fQLOXlKl9pbdTmf9DKM9B9EfsehuPpm6deWE&usqp=CAU' }} style={styles.newsImage} />
            <Text style={styles.newsTitle}>News Title</Text>
            <Text style={styles.stockDescription}>Stock Description</Text>
          </View>
          {/* Repeat... */}
        </ScrollView>
      </View>
    </ScrollView>
    <View style={styles.navBar}>
          <TouchableOpacity style={styles.navBarItem} onPress={navigateToDashboard}>
            <Ionicons name="home" size={26} color="white" />
            <Text style={styles.navBarText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBarItem} onPress={navigateToDiscover}>
            <Ionicons name="search" size={26} color="white" />
            <Text style={styles.navBarText}>Discover</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBarItem} onPress={navigateToPortfolio}>
            <Ionicons name="briefcase" size={26} color="white" />
            <Text style={styles.navBarText}>Portfolio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBarItem} onPress={navigateToMore}>
            <Ionicons name="ellipsis-horizontal" size={26} color="white" />
            <Text style={styles.navBarText}>More</Text>
          </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#51CC62',
    marginTop: 50
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  stocksSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  seeAll: {
    fontSize: 16,
    color: '#51CC62',
  },
  stocksList: {
    flexDirection: 'row',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  
  stockItem: {
    marginRight: 16,
  },
  stockImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  stockImage1: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  stockImage3: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  stockName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  stockDescription: {
    fontSize: 14,
    color: '#666',
  },
  newsSection: {},
  newsList: {},
  newsItem: {
    marginBottom: 16,
  },
  newsImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 25,
},
navBarItem: {
    flex: 1,
    alignItems: 'center',
},
navBarText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
},
});

export default Discover;
