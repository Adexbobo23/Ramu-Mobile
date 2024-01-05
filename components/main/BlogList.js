import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { Modalize } from 'react-native-modalize';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const modalRef = useRef(null);

    useEffect(() => {
        const fetchBlogs = async () => {
          try {
            // Fetch user token from AsyncStorage
            const userToken = await AsyncStorage.getItem('userToken');
            
            const response = await axios.get('https://api-staging.ramufinance.com/api/v1/blog-posts', {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            });
    
            if (response.data.status) {
              setBlogs(response.data.data);
            } else {
              console.error('Error fetching blogs:', response.data.message);
            }
          } catch (error) {
            console.error('Error fetching blogs:', error.message);
          }
        };
    
        fetchBlogs();
      }, []);
    
      const handleBlogSelect = (blog) => {
        setSelectedBlog(blog);
        modalRef.current?.open();
      };

      
  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Blog Posts</Text>

        {/* List of Blog Posts */}
        <ScrollView style={styles.blogList} showsVerticalScrollIndicator={false}>
          {blogs.map((blog) => (
            <TouchableOpacity
              key={blog.id}
              style={styles.blogItem}
              onPress={() => handleBlogSelect(blog)}
            >
              <Image
                source={{ uri: `data:image/jpeg;base64,${blog.thumbnail_image}` }}
                style={styles.blogImage}
              />
              <Text style={styles.blogTitle}>{blog.title}</Text>
              <Text style={styles.blogAuthor}>{`Author: ${blog.writer_info.user_name}`}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>

      <Modalize ref={modalRef}>
        <View style={styles.modalContent}>
          {selectedBlog && (
            <>
              <Text style={styles.modalTitle}>{selectedBlog.title}</Text>
              <Text style={styles.modalAuthor}>{`Author: ${selectedBlog.writer_info.user_name}`}</Text>
              <Text style={styles.modalBody}>{selectedBlog.body}</Text>
            </>
          )}
        </View>
      </Modalize>
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
    marginBottom: 20,
    color: '#51CC62',
    marginTop: 50,
  },
  blogList: {
    marginBottom: 20,
  },
  blogItem: {
    marginBottom: 20,
  },
  blogImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  blogAuthor: {
    fontSize: 14,
    color: '#666',
  },
  modalContent: {
    padding: 16,
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
});

export default BlogList;
