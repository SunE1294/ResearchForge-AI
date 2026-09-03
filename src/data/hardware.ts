export interface CloudRuntimeTier {
  id: string;
  name: string;
  provider: string;
  freeTierSpecs: string;
  weeklyAllowance: string;
  idealFor: string;
  idealForBn: string;
  pros: string[];
  limitations: string[];
  link: string;
}

export const CLOUD_RUNTIMES: CloudRuntimeTier[] = [
  {
    id: "kaggle-notebooks",
    name: "Kaggle Notebooks",
    provider: "Google Cloud / Kaggle",
    freeTierSpecs: "NVIDIA Tesla T4 x 2 (16GB VRAM each) or P100 (16GB) + 30GB RAM",
    weeklyAllowance: "30 Hours of GPU compute every 7 days (phone verification required)",
    idealFor: "Deep Learning training, PyTorch LLM fine-tuning, large tabular modeling",
    idealForBn: "ডিপ লার্নিং মডেল ট্রেইনিং, পাইটর্চ এলএলএম ফাইন টিউনিং, বৃহৎ ডেটাসেট প্রসেসিং",
    pros: [
      "2x T4 GPU parallelization support",
      "Integrated access to all Kaggle datasets with zero download delay",
      "Persistent 20GB output directory",
      "Does not disconnect aggressively on browser backgrounding"
    ],
    limitations: [
      "9-hour execution limit per single interactive session",
      "Cannot host long-running public web endpoints",
      "Weekly reset cadence requires budget awareness"
    ],
    link: "https://www.kaggle.com/code"
  },
  {
    id: "google-colab-free",
    name: "Google Colab (Free Runtime)",
    provider: "Google Research",
    freeTierSpecs: "NVIDIA Tesla T4 (15GB VRAM) + 12GB RAM",
    weeklyAllowance: "Dynamic allocation based on server load (typically 3-5h continuous)",
    idealFor: "Rapid prototyping, interactive visualization, paper reproduction notebooks",
    idealForBn: "দ্রুত প্রোটোটাইপ তৈরি, ইন্টারঅ্যাক্টিভ ভিজ্যুয়ালাইজেশন, কোড টিউটোরিয়াল রান",
    pros: [
      "Direct Google Drive mount (`drive.mount('/content/drive')`)",
      "Instant sharing with research advisors via link",
      "Pre-installed PyTorch, TensorFlow, OpenCV, HuggingFace"
    ],
    limitations: [
      "Aggressive idle timeout (disconnects within 15-30 mins if tab inactive)",
      "VRAM allocation is not guaranteed during peak US/European working hours",
      "Max 12-hour session lifetime"
    ],
    link: "https://colab.research.google.com/"
  },
  {
    id: "lightning-ai-studios",
    name: "Lightning AI Studios",
    provider: "Lightning AI (PyTorch Lightning)",
    freeTierSpecs: "Free monthly credits equivalent to ~22 hours of T4 GPU",
    weeklyAllowance: "Monthly credit grant",
    idealFor: "Full-stack ML engineering, multi-node training, VS Code in browser",
    idealForBn: "ফুল-স্ট্যাক মেশিন লার্নিং, ব্রাউজারে ফুল ভিএস কোড পরিবেশ ও পাইটর্চ লাইটনিং",
    pros: [
      "Persistent cloud drive that never deletes installed packages",
      "Full VS Code editor with terminal and port forwarding",
      "One-click multi-GPU scaling"
    ],
    limitations: [
      "Monthly credit cap; pauses machine when exhausted",
      "Free tier storage capped at 15GB"
    ],
    link: "https://lightning.ai/"
  },
  {
    id: "huggingface-spaces",
    name: "Hugging Face Spaces (Free CPU)",
    provider: "Hugging Face",
    freeTierSpecs: "2 vCPU, 16GB RAM, Free persistent hosting",
    weeklyAllowance: "24/7 Always-On Free Tier",
    idealFor: "Deploying thesis demonstration web apps (Gradio / Streamlit)",
    idealForBn: "থিসিসের ইন্টারঅ্যাক্টিভ ডেমো বা অ্যাপ ডিপ্লয়মেন্ট (Gradio / Streamlit)",
    pros: [
      "Public showcase URL to cite in your published paper",
      "Free permanent uptime",
      "Direct integration with HuggingFace Model Hub"
    ],
    limitations: [
      "GPU instances require payment (CPU only on free tier)",
      "Limited compute for heavy batch inference"
    ],
    link: "https://huggingface.co/spaces"
  }
];

export interface StudentOptimizationTip {
  id: string;
  title: string;
  titleBn: string;
  codeSnippet?: string;
  explanation: string;
  explanationBn: string;
}

export const STUDENT_OPTIMIZATION_TIPS: StudentOptimizationTip[] = [
  {
    id: "fp16-mixed-precision",
    title: "Enable Automatic Mixed Precision (AMP / FP16)",
    titleBn: "অটোমেটিক মিক্সড প্রিসিশন (FP16) সক্রিয় করুন",
    codeSnippet: `from torch.cuda.amp import autocast, GradScaler

scaler = GradScaler()
for images, labels in dataloader:
    optimizer.zero_grad()
    with autocast():
        outputs = model(images)
        loss = criterion(outputs, labels)
    scaler.scale(loss).backward()
    scaler.step(optimizer)
    scaler.update()`,
    explanation: "Cuts GPU VRAM consumption by nearly 50% and doubles training speed on modern Tensor Cores (T4/P100) with zero loss of accuracy.",
    explanationBn: "জিপিইউ র‍্যামের ব্যবহার প্রায় অর্ধেক কমিয়ে দেয় এবং টি৪ গ্রাফিক্স কার্ডে ট্রেইনিং গতি দ্বিগুণ করে।"
  },
  {
    id: "gradient-accumulation",
    title: "Gradient Accumulation for Larger Virtual Batch Sizes",
    titleBn: "ছোট জিপিইউতে বড় ব্যাচ সাইজ ব্যবহারের জন্য গ্র্যাডিয়েন্ট অ্যাকুমুলেশন",
    codeSnippet: `accumulation_steps = 4
for i, (inputs, targets) in enumerate(dataloader):
    loss = model(inputs, targets) / accumulation_steps
    loss.backward()
    if (i + 1) % accumulation_steps == 0:
        optimizer.step()
        optimizer.zero_grad()`,
    explanation: "Enables training with effective batch sizes of 64 or 128 on a 15GB VRAM GPU by updating weights only once every N micro-batches.",
    explanationBn: "কম মেমোরির জিপিইউতে মেমোরি ক্র্যাশ না ঘটিয়ে বড় ব্যাচ সাইজের মতো মডেল ট্রেইন করার মোক্ষম উপায়।"
  },
  {
    id: "checkpoint-drive",
    title: "Safe Model Checkpointing to Google Drive",
    titleBn: "গুগল ড্রাইভে স্বয়ংক্রিয় মডেল চেকপয়েন্ট সংরক্ষণ",
    codeSnippet: `import torch
# Save checkpoint after each epoch
torch.save({
    'epoch': epoch,
    'model_state_dict': model.state_dict(),
    'optimizer_state_dict': optimizer.state_dict(),
    'loss': loss,
}, f"/content/drive/MyDrive/thesis_checkpoints/epoch_{epoch}.pt")`,
    explanation: "Prevents loss of hours of training progress if Google Colab disconnects or times out mid-epoch.",
    explanationBn: "কোলাব ডিসকানেক্ট হয়ে গেলেও আপনার ঘন্টার পর ঘন্টা ট্রেইনিংয়ের ফলাফল নিরাপদ থাকবে।"
  }
];
