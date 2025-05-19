# AI Image Analyzer and Inspector

An advanced AI-powered web application built with Next.js, Shadcn-UI, and Google's Gemini AI. This tool allows users to upload images and ask specific questions about their content, receiving detailed AI-generated insights.

---

## 🚀 Abilities

- **Image Upload**: Drag-and-drop or browse to select images.
- **File Validation**: Supports JPG, JPEG, PNG, GIF, and WEBP formats.
- **AI-Powered Analysis**: Ask specific questions about your images and receive detailed, structured responses.
- **Progress Indicators**: Visual feedback during image upload and analysis.
- **Markdown Rendering**: AI responses are formatted clearly with titles, lists, and paragraphs for easy readability.
- **Theme Support**: Toggle between dark and light themes for comfortable viewing.

---

## ✅ Validations

- **File Type**: Only accepts image files (`jpg`, `jpeg`, `png`, `gif`, `webp`).
- **File Size**: Maximum file size limit of 5MB per upload.
- **Prompt Validation**: Requires a non-empty question prompt before analysis.

---

## ⚠️ Limitations

- **File Size**: Large images (>5MB) are not supported.
- **File Types**: Non-image files or unsupported image formats will be rejected.
- **AI Accuracy**: Responses depend on the clarity of the uploaded image and the specificity of the user's question. Ambiguous or unclear images/questions may yield less accurate results.

---

## 🛠️ Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/ai-image-analyzer.git
cd ai-image-analyzer
npm install
```

Run the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`.

---

## 📖 How to Use the Program

### Step 1: Upload an Image
- Drag and drop an image file onto the upload area, or click to browse and select a file from your device.
- Ensure the file is one of the supported formats (`jpg`, `jpeg`, `png`, `gif`, `webp`) and under 5MB.

### Step 2: Enter Your Question
- Type a clear and specific question about the uploaded image into the provided textbox.

### Step 3: Analyze the Image
- Click the **"Analyze Image with AI"** button.
- Wait for the AI to process your request. A loading indicator will appear during analysis.

### Step 4: View Results
- The AI-generated analysis will appear clearly formatted with headings, lists, and paragraphs for easy readability.

---

## 🧑‍💻 Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **Shadcn-UI**: UI components library for modern, accessible interfaces.
- **Google Gemini AI**: Advanced generative AI model for image analysis.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.

---

## 📌 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.