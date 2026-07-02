# Blog API Documentation

Base URL: `http://localhost:5000`

---

## POST /login

Authenticate as admin and receive a JWT token.

### Request Body

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

### Responses

| Status | Description |
|--------|-------------|
| 200 | Login successful |
| 400 | Missing email or password |
| 401 | Invalid credentials |

### Example Response (200)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## POST /upload

Upload an image to Cloudinary. **Requires authentication.**

### Headers

```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

### Form Data

| Field | Type | Required |
|-------|------|----------|
| image | file | Yes |

### Responses

| Status | Description |
|--------|-------------|
| 200 | Upload successful |
| 400 | No file or invalid file type |
| 401 | Unauthorized |

### Example Response (200)

```json
{
  "url": "https://res.cloudinary.com/your-cloud/image/upload/v123/blog-uploads/photo.jpg"
}
```

---

## GET /blogs

Get all blogs. **Public.**

### Responses

| Status | Description |
|--------|-------------|
| 200 | List of blogs |

### Example Response (200)

```json
[
  {
    "id": "1",
    "title": "Welcome to Blog Module",
    "slug": "welcome-to-blog-module",
    "excerpt": "This is the first blog.",
    "coverImage": "",
    "published": true,
    "createdAt": "2026-07-02T10:00:00.000Z",
    "updatedAt": "2026-07-02T10:00:00.000Z",
    "blocks": [
      {
        "id": "block-1",
        "type": "heading",
        "data": { "text": "Welcome" }
      }
    ]
  }
]
```

---

## GET /blogs/:slug

Get a single blog by slug. **Public.**

### Responses

| Status | Description |
|--------|-------------|
| 200 | Blog found |
| 404 | Blog not found |

### Example Response (200)

```json
{
  "id": "1",
  "title": "Welcome to Blog Module",
  "slug": "welcome-to-blog-module",
  "excerpt": "This is the first blog.",
  "coverImage": "",
  "published": true,
  "createdAt": "2026-07-02T10:00:00.000Z",
  "updatedAt": "2026-07-02T10:00:00.000Z",
  "blocks": []
}
```

### Example Response (404)

```json
{
  "message": "Blog not found"
}
```

---

## POST /blogs

Create a new blog. **Requires authentication.**

### Headers

```
Authorization: Bearer <token>
Content-Type: application/json
```

### Request Body

```json
{
  "title": "My New Blog",
  "excerpt": "A short summary",
  "coverImage": "https://example.com/cover.jpg",
  "published": true,
  "blocks": [
    {
      "id": "block-1",
      "type": "heading",
      "data": { "text": "Hello World" }
    },
    {
      "id": "block-2",
      "type": "paragraph",
      "data": { "text": "First paragraph." }
    }
  ]
}
```

### Responses

| Status | Description |
|--------|-------------|
| 201 | Blog created |
| 400 | Validation failed |
| 401 | Unauthorized |

### Example Response (201)

```json
{
  "id": "3",
  "title": "My New Blog",
  "slug": "my-new-blog",
  "excerpt": "A short summary",
  "coverImage": "https://example.com/cover.jpg",
  "published": true,
  "createdAt": "2026-07-02T12:00:00.000Z",
  "updatedAt": "2026-07-02T12:00:00.000Z",
  "blocks": []
}
```

### Example Response (400)

```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

---

## PUT /blogs/:id

Update an existing blog by ID. **Requires authentication.**

Preserves `id` and `createdAt`. Regenerates `slug` from title (with duplicate suffix if needed).

### Headers

```
Authorization: Bearer <token>
Content-Type: application/json
```

### Request Body

Same as POST /blogs.

### Responses

| Status | Description |
|--------|-------------|
| 200 | Blog updated |
| 400 | Validation failed |
| 401 | Unauthorized |
| 404 | Blog not found |

### Example Response (200)

```json
{
  "id": "1",
  "title": "Updated Title",
  "slug": "updated-title",
  "excerpt": "Updated excerpt",
  "coverImage": "https://example.com/new-cover.jpg",
  "published": false,
  "createdAt": "2026-07-02T10:00:00.000Z",
  "updatedAt": "2026-07-02T12:30:00.000Z",
  "blocks": []
}
```

---

## DELETE /blogs/:id

Delete a blog by ID. **Requires authentication.**

### Headers

```
Authorization: Bearer <token>
```

### Responses

| Status | Description |
|--------|-------------|
| 200 | Blog deleted |
| 401 | Unauthorized |
| 404 | Blog not found |

### Example Response (200)

```json
{
  "message": "Blog deleted successfully"
}
```

---

## Authentication

Protected routes require a JWT in the Authorization header:

```
Authorization: Bearer <token>
```

Obtain a token via `POST /login`.

---

## Database Providers

Set `DB_PROVIDER` in `.env`:

| Value | Description |
|-------|-------------|
| `json` | Uses `src/seed/blogs.json` (default) |
| `mysql` | Uses MySQL via `mysql2` |

For MySQL, run `src/seed/blogs.sql` to create the database and table.

---

## Postman Quick Reference

### 1. Login

```
POST http://localhost:5000/login
Content-Type: application/json

{ "email": "admin@example.com", "password": "password123" }
```

### 2. Create Blog

```
POST http://localhost:5000/blogs
Authorization: Bearer {{token}}
Content-Type: application/json

{ "title": "...", "excerpt": "...", "coverImage": "", "published": true, "blocks": [...] }
```

### 3. Update Blog

```
PUT http://localhost:5000/blogs/1
Authorization: Bearer {{token}}
Content-Type: application/json
```

### 4. Delete Blog

```
DELETE http://localhost:5000/blogs/1
Authorization: Bearer {{token}}
```

### 5. Upload Image

```
POST http://localhost:5000/upload
Authorization: Bearer {{token}}
Body: form-data, key=image, type=File
```
