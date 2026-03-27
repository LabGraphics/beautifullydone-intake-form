export function writeToDatastore(formData) {
  return new Promise((resolve) => {
    console.log("Simulating datastore write for:", formData);
    setTimeout(() => {
      resolve({ success: true, timestamp: new Date(), record: formData });
    }, 500); 
  });
}
