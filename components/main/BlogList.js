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
    <View style={styles.container}>
      <Text style={styles.title}>All News</Text>

      {/* List of Blog Posts */}
      <ScrollView style={styles.blogList} showsVerticalScrollIndicator={false}>
        {blogs.map((blog) => (
          <TouchableOpacity
            key={blog.id}
            style={styles.blogItem}
            onPress={() => handleBlogSelect(blog)}
          >
            <Image
              source={{ uri: blog.thumbnail_image }}
              style={styles.blogImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.blogTitle}>{blog.title}</Text>
              <Text style={styles.blogBody} numberOfLines={3}>{blog.body.slice(0, 100)}...</Text>
              <Text style={styles.blogAuthor}>{`Author: ${blog.writer_info.user_name}`}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
});

export default BlogList;
