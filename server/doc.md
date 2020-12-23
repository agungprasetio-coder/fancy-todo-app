**Add New Todo**
----
  Create new Todo on server

* **URL**

  /todos

* **Method:**

  `POST`

* **Data Params**

  `title=[string]`
  `description=[string]`
  `status=[boolean]`
  `due_date=[date]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
    "id": 2,
    "title": "Livecode",
    "description": "Livecode week 1",
    "status": false,
    "due_date": "2020-10-28T00:00:00.000Z",
    "updatedAt": "2020-10-26T12:19:39.860Z",
    "createdAt": "2020-10-26T12:19:39.860Z"
}`
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** `{
    "error": [
        "please input future time!"
    ]
}`

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** ``


**Find All Todos**
----
  `return all todos on server`

* **URL**

  `/todos`

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "data": [
        {
            "id": 60,
            "title": "Livecode",
            "description": "Week2",
            "status": false,
            "due_date": "2020-11-10T16:59:00.000Z",
            "createdAt": "2020-11-02T11:32:33.973Z",
            "updatedAt": "2020-11-02T19:34:11.085Z",
            "UserId": 1
        },
        {
            "id": 65,
            "title": "Simulasi LC",
            "description": "Bootstrap 3",
            "status": false,
            "due_date": "2020-11-03T00:00:00.000Z",
            "createdAt": "2020-11-02T17:47:39.426Z",
            "updatedAt": "2020-11-02T19:34:08.921Z",
            "UserId": 1
        }
    ]
  }`
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** `{"error":"Authentication failed"}`

  OR

  *  **Code:** 500 Internal Server Error <br />
    **Content:** `{"error":"Internal Server Error"}`


**Find Todo by ID**
----
  `Find Todo by id on server`

* **URL**

  `/todos/:id`

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

*  **Headers**

   **Required:**

   `token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"data":{"id":65,"title":"Simulasi LC","description":"Bootstrap 3","status":false,"due_date":"2020-11-16T16:59:00.000Z","UserId":1,"email":"prasetioxagung@gmail.com"}}`
 
* **Error Response:**

  * **Code:** 404 Not Found <br />
    **Content:** `{"error":"Todo not found"}`

  OR

  * **Code:** 400 Bad Request <br />
    **Content:** `{"error":"Authentication failed"}`

  OR

   * **Code:** 500 Internal Server Error <br />
      **Content:** `{"error":"Internal Server Error"}`

**PUT Todo by ID**
----
  Update all fields of Todo by id on server

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  `title=[string]`
  `description=[string]`
  `status=[boolean]`
  `due_date=[date]`

*  **Headers**

   **Required:**

   `token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 1,
    "title": "Ngoding",
    "description": "Materi REST API",
    "status": false,
    "due_date": "2020-10-27T00:00:00.000Z",
    "createdAt": "2020-10-26T12:17:46.572Z",
    "updatedAt": "2020-10-26T12:17:46.572Z"
}`
 
* **Error Response:**

  * **Code:** 404 Not Found <br />
    **Content:** `{
    "error": " id not found"
}`

  OR

  * **Code:** 400 Bad Request <br />
    **Content:** `{
    "errors": [
        "please input future time!"
      ]
    }`

  OR

   *   **Code:** 500 Internal Server Error <br />
      **Content:** ``


**Patch Todo by ID**
----
  Update several fields of Todo by id on server

* **URL**

  /todos/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  `status=[boolean]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 1,
    "title": "Ngoding selesai",
    "description": "Materi REST API",
    "status": false,
    "due_date": "2020-10-27T00:00:00.000Z",
    "createdAt": "2020-10-26T12:17:46.572Z",
    "updatedAt": "2020-10-26T15:12:03.321Z"
}`
 
* **Error Response:**

  * **Code:** 404 Not Found <br />
    **Content:** `{
    "error": " id not found"
}`

  OR

   * **Code:** 400 Bad Request <br />
      **Content:** `{
      "errors": [
          "Status is required!"
      ]
  }`

  OR

   * **Code:** 500 Internal Server Error <br />
      **Content:** ``



**Delete Todo by ID**
----
  Delete Todo by id on server

* **URL**

  /todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "message": "todo success to delete"
}`
 
* **Error Response:**

  * **Code:** 404 Not Found <br />
    **Content:** `{
    "error": " id not found"
}`

  OR

   * **Code:** 500 Internal Server Error <br />
      **Content:** ``