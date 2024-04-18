export const postValue = (article) => {
  const textLength = article.text.length;
  const titleLength = article.title.length;
  const tagsCount = article.tags.length;
  const viewCount = article.viewCount;

  // Вычисление ценности
  const value =
    (textLength * 10 + titleLength + tagsCount * 100) * viewCount * 60* 1000;

  return value;
};
