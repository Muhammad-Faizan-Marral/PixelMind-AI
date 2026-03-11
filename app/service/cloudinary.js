export async function cloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  const data =  await res.json();
  console.log(data)
  return data

}
