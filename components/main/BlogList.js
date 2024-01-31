import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import axios from 'axios';
import { Modalize } from 'react-native-modalize';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    fetchBlogs();
  }, [page, searchTerm]);

  const fetchBlogs = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');

      const response = await axios.get('https://api-staging.ramufinance.com/api/v1/blog-posts', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        params: {
          page,
          search: searchTerm,
        },
      });

      if (response.data.status) {
        if (page === 1) {
          setBlogs(response.data.data);
        } else {
          setBlogs((prevBlogs) => [...prevBlogs, ...response.data.data]);
        }
      } else {
        console.error('Error fetching blogs:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error.message);
    }
  };

  const handleBlogSelect = (blog) => {
    setSelectedBlog(blog);
    modalRef.current?.open();
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearch = () => {
    setPage(1);
    fetchBlogs();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Search</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Latest Blogs</Text>

      <ScrollView
        style={styles.blogList}
        showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          if (
            nativeEvent.layoutMeasurement.height +
            nativeEvent.contentOffset.y >=
            nativeEvent.contentSize.height - 20
          ) {
            handleLoadMore();
          }
        }}
      >
        {blogs.map((blog, index) => (
          <TouchableOpacity
            key={`${blog.id}-${index}`}
            style={styles.blogItem}
            onPress={() => handleBlogSelect(blog)}
          >
            <Image
              source={{ uri: blog.thumbnail_image }}
              style={styles.blogImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.blogTitle}>{blog.title}</Text>
              <Text style={styles.blogBody} numberOfLines={3}>
                {blog.body.slice(0, 100)}...
              </Text>
              <Text style={styles.blogAuthor}>{`Author: ${blog.writer_info.user_name}`}</Text>
            </View>
          </TouchableOpacity>
        ))}
        {blogs.length > 0 && (
          <Button
            title="Load More"
            onPress={handleLoadMore}
            color="#51CC62"
            style={styles.loadMoreButton}
          />
        )}
      </ScrollView>

      <Modalize ref={modalRef}>
        <View style={styles.modalContent}>
          {selectedBlog && (
            <>
              <Text style={styles.modalTitle}>{selectedBlog.title}</Text>
              <Image
                source={{ uri: selectedBlog.thumbnail_image }}
                style={styles.blogImage}
              />
              <Text style={styles.modalAuthor}>{`Author: ${selectedBlog.writer_info.user_name}`}</Text>
              <Text style={styles.modalBody}>{selectedBlog.body}</Text>
            </>
          )}
        </View>
      </Modalize>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#51CC62',
    marginTop: 20,
    textAlign: 'center',
  },
  blogList: {
    marginBottom: 20,
  },
  blogItem: {
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  blogImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textContainer: {
    padding: 16,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#51CC62',
  },
  blogAuthor: {
    fontSize: 14,
    color: '#666',
  },
  blogBody: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  modalContent: {
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#51CC62',
  },
  modalAuthor: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  modalBody: {
    fontSize: 16,
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  searchButton: {
    backgroundColor: '#51CC62',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadMoreButton: {
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default BlogList;
