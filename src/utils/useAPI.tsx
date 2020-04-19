import React, {useCallback, useEffect, Fragment} from 'react';
import useAxios from 'axios-hooks';
import { useSnackbar } from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export function useAPI(method:string, url:string = "", isManual:boolean = false, specificSuccessMessage = null) {

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [{ data, loading, error, response }, refetch] = useAxios(
        // @ts-ignore
        {
            method: method,
            url: url
        },
        { manual: isManual }
    );

    const action = (key:any) => (
        <Fragment>
            <IconButton
                onClick={() => {
                    closeSnackbar(key);
                }}
            >
                <CloseIcon />
            </IconButton>
        </Fragment>
    );

    const displaySuccess = useCallback(() => {

        if (method === 'POST' || method === 'PATCH' || method === 'DELETE') {
            let successMessage = specificSuccessMessage
                ? specificSuccessMessage
                : 'Modification effectuée !';
            enqueueSnackbar(successMessage, {
                variant: 'success',
                persist: false
            });
        }

    },[method, enqueueSnackbar, specificSuccessMessage]);

    const displayError = useCallback(() => {

        enqueueSnackbar('Error :' + method + ' ' + url + ' -> ' + error, {
            variant: 'error',
            persist: true,
            action
        });

    },[method, url, enqueueSnackbar, error]);

    useEffect(() => {
        if (error) {
            displayError();
        }
    }, [error, displayError]);

    useEffect(() => {
        if (response) {
            displaySuccess();
        }
    }, [response, displaySuccess]);

    return [
        {
            data:data,
            loading:loading
        },
        refetch
    ];

}