# Product Browsing Backend Assignment

This assignment was built with the goal of handling a large product dataset efficiently while keeping the UI simple and responsive.

## Overview

The application allows users to:

- browse products sorted from newest to oldest
- filter products by category
- search products by name, model number, or category
- add new products
- update existing products
- paginate through large data safely and efficiently

The backend is designed around a single `Product` model with a unified schema, which makes querying and pagination much simpler than handling multiple collections separately.

## What Was Required

According to my understanding, the assignment required:

- pagination
- product addition
- product update
- category-based filtering
- search functionality
- newest-first product listing

## Approach Taken

### Single API for Browsing, Filtering, Searching, and Pagination

For browsing, filtering, and searching, I used one API endpoint.

The frontend sends:
- current page number
- limit
- optional category
- optional search text

These are passed as query parameters, and the backend uses them to build the final MongoDB query.

This makes the system cleaner and easier to maintain.

### Separate Add Logic

Adding a product is handled through a separate API call.

After a product is added, the product list is reloaded so the UI always shows the latest data.

### Separate Update Logic

Updating a product is also handled through a separate API call.

After updating, the list is refreshed again so the changes are immediately visible.

## Features

### 1. Pagination
Products are loaded page by page instead of loading all records at once.

This improves performance and makes browsing large datasets easier.

### 2. Newest First Sorting
Products are shown from newest to oldest using the `createdAt` timestamp.

### 3. Category Filter
Users can filter products by category such as:
- Laptop
- Mobile
- MotherBoard
- Processer

### 4. Search
Users can search using:
- product name
- model number
- category

### 5. Add Product
A popup form is used to add new products.

The timestamp fields are handled automatically by MongoDB.

### 6. Update Product
A paginated update list is shown so the user can select a product and edit it.

## Backend Flow

The main browsing route accepts query parameters such as:

```text
/api/alldata?page=1&limit=20&category=Laptop&search=Dell
