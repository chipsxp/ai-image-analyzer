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

# AI Image Analyzer

The AI Image Analyzer is a web application that allows users to upload images and ask questions about them, receiving an AI-generated analysis in response. It features a user-friendly interface with drag-and-drop file uploads, image previews, and themed display.

## Abilities

*   **Image Upload:**
    *   Supports drag-and-drop functionality for easy file selection.
    *   Allows users to select files through the traditional file explorer.
*   **Image Preview:**
    *   Displays a thumbnail preview for uploaded image files.
    *   Shows file details such as name and size.
*   **Interactive AI Analysis:**
    *   Users can input a textual prompt or question related to the uploaded image.
    *   The application sends the image and prompt to an AI for analysis.
*   **Formatted Output:**
    *   AI responses are styled for readability, differentiating between titles, lists, sentences, and paragraphs.
*   **Progress Indication:**
    *   Visual feedback for file processing and submission stages (currently simulated).
    *   Loading indicator during AI analysis.
*   **Theme Customization:**
    *   Users can toggle between light and dark themes for visual preference.

## Validations

The application includes the following client-side validations for file uploads:

*   **File Type:**
    *   Restricts uploads to specific image formats (e.g., `jpg`, `jpeg`, `png`, `gif`, `webp` by default).
    *   This is configurable within the `FileUpload` component.
*   **File Size:**
    *   Enforces a maximum file size limit (e.g., 5MB by default).
    *   This is also configurable within the `FileUpload` component.
*   **Presence of Image for Analysis:**
    *   The "Analyze Image with AI" button is disabled until an image has been successfully uploaded and a prompt is entered.

## Limitations

*   **AI Model Dependency:** The quality, accuracy, and nature of the analysis depend entirely on the capabilities and limitations of the underlying AI model (interfaced via `getAiResult`). The current frontend does not define this model.
*   **Simulated Progress:** The progress bars for "local processing" and "submission" in the `FileUpload` component are currently simulated for frontend demonstration and do not reflect actual backend processing or upload times.
*   **Backend Implementation:** The provided code focuses on the frontend. The actual AI processing logic (`getAiResult` function) and any necessary backend infrastructure are assumed to be implemented separately.
*   **Error Handling:** While there's basic error messaging (e.g., "Failed to analyze image"), comprehensive error handling for various AI or network issues would require further development.
*   **No User Accounts or Persistence:** The application does not support user accounts or store uploaded images and analysis results persistently. Each session is ephemeral.
*   **Network Dependency:** Real AI analysis requires a network connection to the AI service.

## How to Use the Program

Follow these steps to use the AI Image Analyzer:

1.  **Navigate to the Application:**
    *   Open the AI Image Analyzer web application in your browser.

2.  **Upload an Image:**
    *   You have two options to upload an image:
        *   **Drag and Drop:** Drag an image file (e.g., JPG, PNG, GIF, WEBP) from your computer and drop it onto the "Drop your file here" area.
        *   **Select File:** Click the "Select File" button or anywhere within the dropzone area. This will open your system's file explorer, allowing you to browse and select an image file.
    *   Ensure the file meets the specified type (e.g., JPG, PNG) and size (e.g., max 5MB) requirements.

3.  **Confirm File and "Submit":**
    *   After selecting a file, you'll see its name, size, and a thumbnail preview (for image types).
    *   The application will show a "Processing" progress bar (simulated).
    *   Once "processed," a "Ready to Submit" badge will appear.
    *   Click the **"Submit File"** button.
    *   A "Submitting" progress bar will appear (simulated). After completion, the status will change to "Submitted!" or "Uploaded", and the image is ready for analysis.

4.  **Ask Your Question:**
    *   Locate the textbox labeled "Ask Your Question Below" (or similar, e.g., "Textbox: Enter your question for image here...").
    *   Type the question or prompt you want the AI to address regarding the uploaded image. For example, "What are the main objects in this image?" or "Describe the mood of this picture."

5.  **Initiate AI Analysis:**
    *   Once an image has been successfully "Submitted" and you have entered text into the question box, the **"Analyze Image with AI"** button will become enabled.
    *   Click this button.
    *   A loading animation (e.g., a spinning icon) will appear on the button, and the analysis result area might show an "Analyzing your image..." message.

6.  **View the Analysis:**
    *   After the AI processes your request, the results will be displayed in the "Image Analysis" card.
    *   The text will be formatted with appropriate headings, lists, and paragraphs to make it easy to read and understand.

7.  **Change Theme (Optional):**
    *   If you prefer a different visual style, click the **"Toggle Theme"** button, usually located in the header. This will switch the application's appearance between light and dark modes.

8.  **Analyze Another Image:**
    *   To analyze a new image, you can remove the current one by clicking the 'X' icon next to the file details in the upload component. Then, repeat the process from Step 2.

Enjoy exploring the capabilities of the AI Image Analyzer!