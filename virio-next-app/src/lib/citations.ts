// src/lib/citations.ts

// Define an interface for better type safety (optional but good practice)
interface CitationMap {
  [key: number]: string;
}

export const citations: CitationMap = {
  1: "https://formadasocial.com/how-do-i-create-content-for-multiple-audiences/",
  2: "https://www.bynder.com/en/press-media/ai-vs-human-made-content-study/",
  3: "https://www.qualcomm.com/content/dam/qcomm-martech/dm-assets/documents/Whitepaper-The-future-of-AI-is-hybrid-Part-1-Unlocking-the-generative-AI-future-with-on-device-and-hybrid-AI.pdf",
  4: "https://www.slingshotapp.io/blog/content-marketing-kpis",
  5: "https://www.humanitiesdataanalysis.org/getting-data/notebook.html",
  6: "https://www.deloittedigital.com/us/en/insights/perspective/aws-aep-digital-experience-personalization.html",
  7: "https://www.multimodal.dev/post/ai-kpis",
  8: "https://www.signitysolutions.com/blog/rag-pipeline",
  9: "https://blog.developer.adobe.com/a-blueprint-for-audience-activation-in-adobe-experience-platform-b2b30fae90fd",
  10: "https://1worldsync.com/resource-center/blog/how-to-create-and-manage-content-for-multiple-audiences-in-a-digital-world/",
  11: "https://agilitycms.com/blog/how-to-architect-and-model-your-content-for-personalization",
  12: "https://www.onlinescientificresearch.com/articles/the-role-of-artificial-intelligence-in-content-personalization-transforming-user-experience-in-the-digital-age.html",
  13: "https://www.reddit.com/r/marketing/comments/goj4i0/how_do_i_develop_a_social_media_strategy_when_we/",
  14: "https://www.ml.cmu.edu/research/dap-papers/dap_low.pdf",
  15: "https://www.columnfivemedia.com/how-to-market-one-piece-of-marketing-content-to-different-audiences/",
  16: "https://www.greenlanemarketing.com/resources/articles/writing-content-multiple-audience-segments",
  17: "https://www.datagrid.com/blog/automate-content-personalization-ai",
  18: "https://www.vidora.com/docs/personalization-api/",
  19: "https://monetate.com/resources/glossary/what-is-a-personalization-engine/",
  20: "https://contentmarketinginstitute.com/articles/build-audience-centric-content-strategy/",
  21: "https://www.ibm.com/think/topics/ai-agent-use-cases",
  22: "https://www.earley.com/insights/what-is-hybrid-ai-approach-to-data-discovery",
  23: "https://www.swydo.com/blog/content-marketing-kpis/",
  24: "https://storygrid.com/narrative-machines/",
  25: "https://www.montecarlodata.com/blog-design-data-ingestion-architecture/",
  26: "https://www.progress.com/documentation/sitefinity-cms/insight/Personalization-API-endpoints",
  27: "https://twilioalpha.com/personalization-engine",
  28: "https://contentmarketinginstitute.com/articles/serve-multiple-audiences-with-a-segmented-site-structure/",
  29: "https://www.tavus.io/post/personalization-at-scale",
  30: "https://www.adsmurai.com/en/articles/adapted-creativities-how-to-customize-your-messages-to-win-over-different-audiences",
  31: "https://www.simplekpi.com/Blog/storytelling-with-kpis",
  32: "https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/rag/rag-solution-design-and-evaluation-guide",
  33: "https://www.pattyaubery.com/audiencebuilderblueprint",
  34: "https://atendesigngroup.com/articles/designing-multiple-audiences",
  35: "https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0308607",
  36: "https://www.tability.io/templates/metrics/tags/storyteller",
  37: "https://www.confidentialmind.com/post/building-advanced-rag-pipelines",
  38: "https://www.xyplanningnetwork.com/advisor-blog/the-5-step-blueprint-to-effective-content-marketing-0",
  39: "https://aws.amazon.com/blogs/architecture/architecting-near-real-time-personalized-recommendations-with-amazon-personalize/",
};

// Helper function to get URL by number
export const getCitationUrl = (num: number): string | undefined => {
  return citations[num];
};
