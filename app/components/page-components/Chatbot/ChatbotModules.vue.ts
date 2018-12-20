import { Component } from 'vue-property-decorator';
import ChatbotBase from 'components/page-components/Chatbot/ChatbotBase.vue';
import ChatbotModule from 'components/page-components/Chatbot/Modules/ChatbotModule.vue';
import { $t } from 'services/i18n';

import { IChatbotModule } from 'services/chatbot';

@Component({
  components: {
    ChatbotModule,
  },
})
export default class ChatbotModules extends ChatbotBase {
  mounted() {
    this.chatbotApiService.fetchChatAlerts();
    this.chatbotApiService.fetchSongRequest();
  }

  get modules(): IChatbotModule[] {
    const backgroundUrlSuffix = this.nightMode ? 'night' : 'day';
    const comingSoonText = $t(
      'Streamlabs is diligently working on the next release of Chatbot. Stay tuned. We have more features on the way.',
    );
    return [
      {
        title: $t('Chat Alerts'),
        description: $t(
          'Get notified in chat whenever an activity happens like Donations and Subscribers.',
        ),
        backgroundUrl: require(`../../../../media/images/chatbot/chatbot-alert--${backgroundUrlSuffix}.png`),
        enabled: this.chatAlertCurrentlyEnabled,
        onExpand: () => {
          this.chatbotCommonService.openChatbotAlertsWindow();
        },
        onToggleEnabled: () => {
          this.chatbotApiService.updateChatAlerts({
            ...this.chatAlerts,
            enabled: !this.chatAlertCurrentlyEnabled,
          });
        },
      },
      {
        title: $t('Song Request'),
        description: comingSoonText,
        backgroundUrl: require(`../../../../media/images/chatbot/chatbot-construction--${backgroundUrlSuffix}.svg`),
        enabled: false,
        onExpand: () => {},
        onToggleEnabled: () => {},
        comingSoon: true,
      },
      {
        title: $t('Mini Games'),
        description: comingSoonText,
        backgroundUrl: require(`../../../../media/images/chatbot/chatbot-construction--${backgroundUrlSuffix}.svg`),
        enabled: false,
        onExpand: () => {},
        onToggleEnabled: () => {},
        comingSoon: true,
      },
      {
        title: $t('Counter'),
        description: comingSoonText,
        backgroundUrl: require(`../../../../media/images/chatbot/chatbot-construction--${backgroundUrlSuffix}.svg`),
        enabled: false,
        onExpand: () => {},
        onToggleEnabled: () => {},
        comingSoon: true,
      },
    ];
  }

  get chatAlerts() {
    return this.chatbotApiService.state.chatAlertsResponse;
  }

  get chatAlertCurrentlyEnabled() {
    return this.chatbotApiService.state.chatAlertsResponse.enabled;
  }

  get songRequest() {
    return this.chatbotApiService.state.songRequestResponse;
  }

  get songRequestCurrentlyEnabled() {
    return this.chatbotApiService.state.songRequestResponse.enabled;
  }
}
