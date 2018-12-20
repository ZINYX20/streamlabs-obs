import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Inject } from 'util/injector';

import {
  ChatbotApiService,
  ChatbotAutopermitEnums,
  ChatbotCommonService,
  ChatbotPermissionsEnums,
  ChatbotPunishments,
  ChatbotResponseTypes,
} from 'services/chatbot';

import { CustomizationService } from 'services/customization';
import Tabs from 'components/Tabs.vue';
import DropdownMenu from 'components/shared/DropdownMenu.vue';
import { inputComponents } from 'components/widgets/inputs';
import VFormGroup from 'components/shared/inputs/VFormGroup.vue';

import { IListOption } from 'components/shared/inputs';

@Component({
  components: {
    ...inputComponents,
    VFormGroup,
    Tabs,
    DropdownMenu,
  },
})
export default class ChatbotBase extends Vue {
  @Inject() chatbotApiService: ChatbotApiService;
  @Inject() chatbotCommonService: ChatbotCommonService;
  @Inject() customizationService: CustomizationService;

  mounted() {
    // pre-load them to switch between multiple windows
    this.chatbotApiService.fetchDefaultCommands();
    this.chatbotApiService.fetchLinkProtection();
    this.chatbotApiService.fetchQuotePreferences();
  }

  get nightMode() {
    return this.customizationService.nightMode;
  }

  get chatbotPermissionsEnums() {
    return ChatbotPermissionsEnums;
  }

  get chatbotPermissions(): IListOption<number>[] {
    return Object.keys(ChatbotPermissionsEnums).reduce((a: IListOption<number>[], b: string) => {
      if (typeof ChatbotPermissionsEnums[b] === 'number') {
        a.push({
          title: b.split('_').join(' '),
          value: ChatbotPermissionsEnums[b],
        });
      }
      return a;
    }, []);
  }

  get chatbotAutopermitOptions(): IListOption<number>[] {
    return Object.keys(ChatbotAutopermitEnums).reduce((a: IListOption<number>[], b: string) => {
      if (typeof ChatbotAutopermitEnums[b] === 'number') {
        a.push({
          title: b.split('_').join(' '),
          value: ChatbotAutopermitEnums[b],
        });
      }
      return a;
    }, []);
  }

  get chatbotResponseTypes() {
    return Object.keys(ChatbotResponseTypes).map(responseType => {
      return {
        value: ChatbotResponseTypes[responseType],
        title: responseType,
      };
    });
  }

  get chatbotPunishments() {
    return Object.keys(ChatbotPunishments).map(punishmentType => {
      return {
        value: ChatbotPunishments[punishmentType],
        title: punishmentType,
      };
    });
  }
}
