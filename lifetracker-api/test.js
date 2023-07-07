test('GET /api/books should return a list of books', async () => {
    const response = await request(app).get('/api/books')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('books');
    expect(Array.isArray(response.body.books)).toBe(true);
})