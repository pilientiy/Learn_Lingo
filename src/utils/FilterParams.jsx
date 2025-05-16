export const filterParams = (teachers, key) => {
    const params = new Set();
    teachers.forEach((teacher) => {
      if (key === "price_per_hour") {
        if (teacher[key]) params.add(Number(teacher[key]));
      } else if (Array.isArray(teacher[key])) {
        teacher[key].forEach((item) =>
          params.add(String(item))
        ); 
      }
    });
    return Array.from(params).sort();
  };