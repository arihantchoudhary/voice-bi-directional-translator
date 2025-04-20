1. Gather & Prepare Your Parallel Data
   General corpora
   – WMT’19 English–Spanish, OPUS (Tatoeba, Ubuntu)

Domain‑specific glossaries
– Collect any English↔Spanish home‑service phrases (from manuals, chat logs, service tickets)

Combine & clean

bash
Copy
Edit

# Example: filter by length ratio and remove bad chars

sacrebleu-clean \
 --source en.txt --target es.txt \
 --maxlen 100 --ratio 1.5 \
 --output-cleaned en.clean.txt es.clean.txt 2. Choose a Pre‑trained Model
For speed and quality, start from a strong multilingual MT model:

Helsinki-NLP/opus-mt-en-es (MarianMT)

facebook/mbart-large-50-many-to-many-mmt

3. Tokenization & Dataset Class
   python
   Copy
   Edit
   from datasets import load_dataset, Dataset
   from transformers import MarianTokenizer

# 1. Load your cleaned bitext

data = load_dataset('csv', data_files={'train': 'train.csv','val':'val.csv'})

# 2. Initialize tokenizer

tokenizer = MarianTokenizer.from_pretrained('Helsinki-NLP/opus-mt-en-es')

# 3. Preprocess

def preprocess(batch): # If your CSV has columns 'en' and 'es'
inputs = tokenizer(batch['en'], truncation=True, padding='max_length', max_length=128)
with tokenizer.as_target_tokenizer():
targets = tokenizer(batch['es'], truncation=True, padding='max_length', max_length=128)
inputs['labels'] = targets['input_ids']
return inputs

tokenized = data.map(preprocess, batched=True, remove_columns=['en','es']) 4. Set Up Trainer & Training Args
python
Copy
Edit
from transformers import MarianMTModel, Seq2SeqTrainingArguments, Seq2SeqTrainer
import evaluate

# Load model

model = MarianMTModel.from_pretrained('Helsinki-NLP/opus-mt-en-es')

# BLEU metric

bleu = evaluate.load('sacrebleu')

def compute_metrics(pred):
labels = pred.label_ids
preds = pred.predictions.argmax(-1)
decoded_preds = tokenizer.batch_decode(preds, skip_special_tokens=True)
decoded_labels = tokenizer.batch_decode(labels, skip_special_tokens=True)
result = bleu.compute(predictions=decoded_preds, references=[[l] for l in decoded_labels])
return {'bleu': result['score']}

# Training arguments

args = Seq2SeqTrainingArguments(
output_dir='home-service-model',
num_train_epochs=3,
per_device_train_batch_size=16,
per_device_eval_batch_size=16,
learning_rate=5e-5,
logging_steps=200,
evaluation_strategy='steps',
eval_steps=1000,
save_steps=1000,
save_total_limit=3,
predict_with_generate=True,
fp16=True, # if you have a GPU
)

trainer = Seq2SeqTrainer(
model=model,
args=args,
train_dataset=tokenized['train'],
eval_dataset=tokenized['val'],
tokenizer=tokenizer,
compute_metrics=compute_metrics,
) 5. Run Training
bash
Copy
Edit
python - <<'EOF'

# (Assuming above code in train.py)

from train import trainer
trainer.train()
EOF 6. Domain‑Adaptive Fine‑Tuning
If you have a small in‑domain parallel set (e.g., 5K–10K home‑service sentences), after the general MT training:

Continue fine‑tuning on just the in‑domain set with a lower LR (e.g., 1e‑5).

Use early stopping (patience=2) to avoid overfitting.

7. Inference Example
   python
   Copy
   Edit
   from transformers import pipeline

translator = pipeline('translation_en_to_es', model='home-service-model', tokenizer=tokenizer)
print(translator("Please book an appointment for a plumbing inspection."))

# → "Por favor, programe una cita para una inspección de plomería."

Tips for Better Domain Performance
Terminology list: add custom tokens or glossary to tokenizer’s additional_special_tokens.

Back‑translation: generate synthetic English from Spanish service tickets to augment data.

LoRA/Adapter: if compute‑constrained, use parameter‑efficient fine‑tuning (LoRA or adapters).

This pipeline gives you a robust English→Spanish home‑service translator you can integrate into your voice‑agent or ticketing system.
