## API Endpoints

### Obtener Resultados
```http
GET /api/resultados
```

### Registrar Voto
```http
POST /api/votar
```

```json
{
  "nickname": "string (6-8 caracteres)",
  "comentario": "string (max 120 caracteres)",
  "valoracion": "number (2 o -1)",
  "candidato": "string ('David Larousse' o 'Jonathan Lowrie')"
}
```

### Reiniciar Votación
## Elimina todos los votos registrados.
```http
POST /api/reset
```

### Probar Conexión DB
```http
GET /api/testdb
```

### ejemplo: 
```http
http://localhost:5000/api/testdb
```