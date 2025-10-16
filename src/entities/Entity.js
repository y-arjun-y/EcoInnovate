// Mock Entity System - Simulates Base44's entity functionality
// This provides a simple in-memory data store for development

class Entity {
  constructor(name, schema) {
    this.name = name;
    this.schema = schema;
    this.data = [];
    this.idCounter = 1;
  }

  // Create a new record
  async create(record) {
    const newRecord = {
      id: this.idCounter++,
      ...record,
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString(),
    };
    this.data.push(newRecord);
    return newRecord;
  }

  // Get all records
  async all() {
    return [...this.data];
  }

  // Get by ID
  async get(id) {
    return this.data.find((item) => item.id === parseInt(id));
  }

  // Filter records
  async filter(conditions = {}, orderBy = null, limit = null) {
    let results = this.data.filter((item) => {
      return Object.entries(conditions).every(([key, value]) => {
        return item[key] === value;
      });
    });

    if (orderBy) {
      const isDescending = orderBy.startsWith("-");
      const field = isDescending ? orderBy.slice(1) : orderBy;
      results.sort((a, b) => {
        if (isDescending) {
          return b[field] > a[field] ? 1 : -1;
        }
        return a[field] > b[field] ? 1 : -1;
      });
    }

    if (limit) {
      results = results.slice(0, limit);
    }

    return results;
  }

  // Update a record
  async update(id, updates) {
    const index = this.data.findIndex((item) => item.id === parseInt(id));
    if (index !== -1) {
      this.data[index] = {
        ...this.data[index],
        ...updates,
        updated_date: new Date().toISOString(),
      };
      return this.data[index];
    }
    return null;
  }

  // Delete a record
  async delete(id) {
    const index = this.data.findIndex((item) => item.id === parseInt(id));
    if (index !== -1) {
      this.data.splice(index, 1);
      return true;
    }
    return false;
  }
}

export default Entity;
