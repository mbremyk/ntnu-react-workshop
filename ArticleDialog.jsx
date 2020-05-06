import React from 'react';

import {ModalDialog} from '@telia/styleguide';

const ArticleDialog = ({onSubmit, article}) =>
    <ModalDialog name='articleDialog' heading={article.title} onSubmit={onSubmit} submitText='Close me daddy'>
        <p>{article.blurb}</p>
    </ModalDialog>

export default ArticleDialog;