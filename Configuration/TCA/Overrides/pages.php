<?php
defined('TYPO3') or die('Access denied.');

call_user_func(function ($extKey='ucph_page_scrollindicator') {
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
        $extKey,
        'Configuration/TsConfig/Page/All.tsconfig',
        'KU Scroll indicator'
    );

    // Add faculty fields to pages table to show TCA fields definitions
    $GLOBALS['TCA']['pages']['columns'] = array_replace_recursive(
        $GLOBALS['TCA']['pages']['columns'],
        [
            'tx_ucph_activate_page_scroll_indicator' => [
                'label' => 'LLL:EXT:'.$extKey.'/Resources/Private/Language/locallang_be.xlf:activate-scroll-indicator',
                'config' => [
                    'type' => 'check',
                    'renderType' => 'checkboxToggle'
                ],
            ],
        ]
    );

    // Make fields visible in custom tab:
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes(
        'pages',
        'tx_ucph_activate_page_scroll_indicator',
        '',
        ''
    );
});
