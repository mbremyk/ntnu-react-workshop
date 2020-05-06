import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import {Button, Container, ModalDialogProvider} from '@telia/styleguide';

import Article from "./Article";
import ArticleDialog from "./ArticleDialog";
import '@telia/styleguide/index.css';

const App = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [loadingArticles, setLoadingArticles] = useState(false);
    const [articles, setArticles] = useState([]);
    const [article, setArticle] = useState(null);
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        setLoadingArticles(true);
        fetch(`//workshop-blog.s3-website-eu-west-1.amazonaws.com/blog/${currentPage}.json`)
            .then(res => res.json())
            .then(({posts}) => {
                setArticles(posts);
                setLoadingArticles(false);
            })
            .catch(error => {
                console.error(error);
                setLoadingArticles(false)
            })
    }, [currentPage]);


    return (
        <Container size='large'>
            {loadingArticles ? 'Loading articles...\nPlease wait' :
                articles.map(({title, date, readTimeMinutes, tags, blurb}, index) => {
                    return <Article key={`article-${index.toString()}`} title={title} tags={tags} onClick={() => {
                        setArticle({title, date, readTimeMinutes, tags, blurb});
                        setShowDialog(true);
                    }}>
                        <p>{blurb}</p>
                    </Article>
                })
            }
            {showDialog && <ArticleDialog onSubmit={() => setShowDialog(false)} article={article}/>}
            {
                !loadingArticles && <>
                    <Button isDisabled={currentPage <= 1} text='Previous'
                            onClick={() => setCurrentPage(currentPage - 1)}/>
                    <Button isDisabled={currentPage >= 2} text='Next' onClick={() => setCurrentPage(currentPage + 1)}/>
                </>
            }
        </Container>
    );
};

ReactDOM.render(
    <ModalDialogProvider>
        <App/>
    </ModalDialogProvider>, document.getElementById('app'));